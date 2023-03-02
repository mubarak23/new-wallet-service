/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Body, Get, Inject, Post, Request, Route, Security, Tags, Path } from "tsoa";
const crypto = require('crypto');
import RequestIp = require('@supercharge/request-ip')
import * as _ from 'underscore'
import PhoneNumber from 'awesome-phonenumber'
import bcrypt from 'bcrypt'
import Logger from '../logger'

import { IServerResponse } from "../interfaces/IServerResponse";
import { BadRequestError, NotFoundError, ServerError, UnauthorizedRequestError, UnprocessableEntityError } from '../utils/error-response-types';

import { User } from "../entity/User";
import { getFreshConnection } from "../db";
import * as PaymentService from "../services/paymentService"
import { PaystackDedicatedNuban } from "../entity/PaystackDedicatedNuban";
import * as PaystackService from "../services/paystackService";
import { PaymentInitialize } from "../dto/PaymentInitialize";
import { PaymentInitializeResponse } from "../dto/PaymentInitializeResponse";
import { PaymentInitializeVariant } from "../enums/PaymentInilizeVariant";
import { PaystackWebhook } from "../entity/PaystackWebhook";
import logger from '../logger'
import { FinancialTransaction, FinancialTransactionMetadata } from "../entity/FinancialTransaction";
import { FinancialTransactionReferenceType, PaymentTransactionStatus, PaymentTransactionTypes } from "../enums/PaymentTransaction";
import { ErrorMessages } from "../enums/ErrorMessages";
import { Wallet } from "../entity/Wallet";
import * as WalletService from "../services/walletService"
import { PaymentVariant } from "../enums/PaymentVarient";
import { PaystackPayingUser } from "../interfaces/PaystackPayingUser"

import { In } from "typeorm";


import * as Utils from '../utils/core'

import { getRepository } from "typeorm";

@Route("api/payments")
@Tags('Payments')
export class PaymentsController {

  @Post('/paystack/initialize')
  @Security('jwt')
  public async initializePaystackPayment(@Request() req: any, @Body() reqBody: PaymentInitialize ): Promise<IServerResponse<PaymentInitializeResponse>> {
    const { paymentVariant, amountMajor, } = reqBody
    const currentUser: User = req.user

    if(!process.env.PAYSTACK_SECRET_KEY) {
      throw new ServerError("Sorry, there was a server mis-configuration.")
    }
    const connection = await getFreshConnection()

    if (paymentVariant === PaymentInitializeVariant.FUND_MAIN_WALLET) {
      if (!amountMajor) {
        throw new BadRequestError('Invalid amount')
      }
      if (amountMajor > 1000000) {
        throw new BadRequestError('Amount should not be more than 1 Million NGN')        
      }
    }
    const payingUser: PaystackPayingUser = {
      emailAddress: currentUser.emailAddress,
      fullName: currentUser.firstName + ' ' + currentUser.lastName 
    }
    const paymentInitResponse = await PaystackService.initializeTransaction(payingUser, amountMajor!)
    
    const resData: IServerResponse<PaymentInitializeResponse> = {
      status: true,
      data: paymentInitResponse
    }
    return resData
  }

  @Post('/paystack/verify/webhook')
  public async verifyPaystackTransaction(@Request() req: any): Promise<IServerResponse<void>> {
    logger.info('Inside verifyPaystackTransaction ...')
    const paystackApiSecretKey = process.env.PAYSTACK_SECRET_KEY;

    const currentSourceIp: string | undefined = RequestIp.getClientIp(req)
    if(!currentSourceIp) {
      throw new UnprocessableEntityError('Could not fetch source ip address')
    }
    const validSourceIps = ['52.31.139.75', '52.49.173.169', '52.214.14.220']

    if (!validSourceIps.includes(currentSourceIp)) {
      throw new UnauthorizedRequestError('Invalid source ip. Counterfeit content!!!')
    }
    if (req.body.data.status !== 'success') {
      throw new UnprocessableEntityError('Unsuccessful payment!!!')
    }

    const connection = await getFreshConnection()
    //--
    const paystackWebhooksRepo = connection.getRepository(PaystackWebhook)
    const paystackWebhook = new PaystackWebhook().initialize('', req.body)
    await paystackWebhooksRepo.save(paystackWebhook)
    //--
    const hash = crypto.createHmac('sha512', paystackApiSecretKey).update(JSON.stringify(req.body)).digest('hex')
    if (hash !== req.headers['x-paystack-signature']) {
      throw new UnauthorizedRequestError('Counterfeit content!!!')
    }

    const paystackReference: string = req.body.data.reference
    const status = await PaystackService.checkPaystackTransaction(paystackReference)
    if (status !== 'success') {
      throw new UnauthorizedRequestError('Counterfeit content!!!')
    }
    //--
    let allGood = false
    if (req.body.data.channel === 'dedicated_nuban') {
      allGood = await this.processPaymentByBankTransfer(req)
    }
    //--
    if (allGood) {
      paystackWebhook.isProcessed = true
      await paystackWebhook.save()
    }

    const resData: IServerResponse<void> = {
      status: allGood,
    }
    return resData
  }

  private async processPaymentByBankTransfer(req: any): Promise<boolean> {
    if (!req.body.data?.customer?.customer_code || !req.body.data?.metadata?.receiver_account_number) {
      Logger.error('customer code and receiver account number not present')
      throw new BadRequestError('customer code and receiver account number not present')
    }
    const paystackDedicatedNubanRepo = getRepository(PaystackDedicatedNuban)
    const financialTransactionRepo = getRepository(FinancialTransaction)
  
    const paystackDedicatedNuban = await paystackDedicatedNubanRepo.findOne({
      paystackCustomerId: `${req.body.data.customer.id}`,
      bankAccountNumber: req.body.data.metadata.receiver_account_number,
      bankName: req.body.data.metadata.receiver_bank
    })
    if (paystackDedicatedNuban) {
      const transaction = await financialTransactionRepo.findOne({
        reference: req.body.data.reference,
        referenceType: FinancialTransactionReferenceType.PAYSTACK
      })
      if (transaction && transaction.paidStatus === PaymentTransactionStatus.PAID) {
        return true
      }
      const amountMinor = req.body.data.amount
      const userId = paystackDedicatedNuban.userId
  
      const sourceWallet = await WalletService.getCustomerWallet(userId)
      const walletBalanceMinorBefore = sourceWallet.walletBalanceMinor
      const metadata: FinancialTransactionMetadata = {
      }
  
      const financialTransaction = new FinancialTransaction().initialize(
        sourceWallet, PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET,
        amountMinor, walletBalanceMinorBefore, undefined, sourceWallet.currency, PaymentTransactionStatus.UNPAID,
        req.body.data.reference, metadata)
      financialTransaction.description = `${sourceWallet.currency}${amountMinor / 100} main wallet fund.`
      
      const transactionRepo = getRepository(FinancialTransaction)
      const savedTransaction = await transactionRepo.save(financialTransaction)
  
      const result = await PaymentService.processVerifiedPaystackPayment(savedTransaction, 
        PaymentVariant.WALLET, sourceWallet
      )
  
      return result ?? false
    }
    return true
  }

  @Get('/paystack/dedicated-account')
  @Security('jwt')
  public async dedicatedAccount(@Request() req: any): Promise<IServerResponse<Omit<PaystackDedicatedNuban, 'id'>>> {
    const currentUser: User = req.user

    const connection = await getFreshConnection()
    
    const paystackDedicatedNubanRepo = connection.getRepository(PaystackDedicatedNuban)
    let paystackDedicatedNuban = await paystackDedicatedNubanRepo.findOne({userId: currentUser.id})

    if (!paystackDedicatedNuban) {
      paystackDedicatedNuban = await PaystackService.createDedicatedNuban(currentUser)

      if (!paystackDedicatedNuban) {
        throw new NotFoundError('Dedicated account not found. Please contact support')        
      }
    }
    
    const resData: IServerResponse<Omit<PaystackDedicatedNuban, 'id'>> = {
      status: true,
      data: _.omit(paystackDedicatedNuban, 'id')
    }
    return resData
  }

}