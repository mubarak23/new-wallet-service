

import { Get, Request, Route, Tags, Security, Query, Post, Body, Controller } from "tsoa"
import { IServerResponse } from "../interfaces/IServerResponse";
import { paginate } from '../services/paginationService';
import { FinancialTransaction } from '../entity/FinancialTransaction';
import { SortOrder } from '../enums/SortOrder';

import { Wallet } from '../entity/Wallet';
import { UnauthorizedRequestError, UnprocessableEntityError } from '../utils/error-response-types';
import * as WalletService from "../services/walletService"
import { User } from '../entity/User';
import { getFreshConnection } from '../db';
import { PaymentTransactionStatus } from '../enums/PaymentTransaction';
import { CurrencyToSymbol } from '../enums/Currency';
import { IPaginatedList } from '../dto/IPaginatedList';
import { IFinancialTransactionResponseDto } from '../dto/IFinancialTransactionResponseDto';
import { WalletType } from '../enums/WalletType';


@Route("api/wallet")
@Tags('Wallet')
@Security("jwt")
export class WalletController extends Controller {
  
  @Get('/main/balance')
  public async mainWalletBalance(@Request() req: any): Promise<IServerResponse<{currency: string, currencySymbol: string, amountMajor: number}>> {
    const currentUser: User = req.user
    
    const connection = await getFreshConnection()
    const walletRepo = connection.getRepository(Wallet)
    const wallet = await walletRepo.findOne({
      where: { id: currentUser.id, type: WalletType.USER },
      order: { createdAt: 'ASC' }
    })
    const currencySymbol = CurrencyToSymbol[wallet?.currency] || '₦'

    const resData: IServerResponse<{currency: string, currencySymbol: string, amountMajor: number}> = {
      status: true,
      data: {
        currency: wallet?.currency,
        currencySymbol,
        amountMajor: (wallet?.walletBalanceMinor || 0) / 100
      }
    }
    return resData
  }

  @Get('/transactions')
  public async financialTransactions(@Request() req: any, 
      @Query('pageNumber') pageNumber: any, 
      @Query('sortOrder') sortOrder: SortOrder): Promise<IServerResponse<IPaginatedList<IFinancialTransactionResponseDto>>> {
    const currentUser: User = req.user

    const pageSize = 10
    const query = {
      userId: currentUser.id,
      paidStatus: PaymentTransactionStatus.PAID
    }
    const pageResult = await paginate(FinancialTransaction, query, pageSize, pageNumber, sortOrder)

    const formattedDataSet: IFinancialTransactionResponseDto[] = pageResult.dataset.map(dataRecord => {
      const transaction = dataRecord as FinancialTransaction
      return transaction.toResponseDto()
    })

    const resData = {
      status: true,
      data: {...pageResult, dataset: formattedDataSet}
    }
    
    return resData
  }

}
