import { PaymentVariant } from "../enums/PaymentVarient"
import { Wallet } from "../entity/Wallet"
import { FinancialTransaction } from "../entity/FinancialTransaction"
import { PaymentTransactionTypes } from "../enums/PaymentTransaction"
import { PaymentTransactionStatus } from "../enums/PaymentTransaction"
import { EntityManager, getRepository, In, MoreThan, Not } from 'typeorm'
import { getFreshConnection } from '../db'
import * as Utils from '../utils/core'
import { User } from "../entity/User"
import Logger from '../logger'

export const processVerifiedPaystackPayment = async (transaction: FinancialTransaction,
  orderPaymentVariant: PaymentVariant,
  sourceWallet: Wallet): Promise<boolean> => {
try {
  if(transaction.transactionType === PaymentTransactionTypes.EXTERNAL_TO_FUND_WALLET) {
    return processFundWalletTransaction(transaction, sourceWallet)      
  }

  
  return true
} catch (e) {
  Logger.info(`Inside processVerifiedPaystackPayment exception: `, e.message)
  Logger.info(`Inside processVerifiedPaystackPayment exception stack: `, e.stack)
}
return true
}

export const processFundWalletTransaction = async (
transaction: FinancialTransaction, sourceWallet: Wallet,
): Promise<boolean> => {
const financialTransactionRepo = getRepository(FinancialTransaction)
const walletRepo = getRepository(Wallet)

const paymentTransactionUpdate: any = {
  walletBalanceMinorAfter: () => `wallet_balance_minor_before + ${transaction.amountMinor}`,
  paidStatus: PaymentTransactionStatus.PAID,
  paidAt: Utils.utcNow()
}
const saveFinancial = await financialTransactionRepo.update(transaction.id, paymentTransactionUpdate)
await walletRepo.createQueryBuilder()
  .update(Wallet)
  .set({
    walletBalanceMinor: sourceWallet!.walletBalanceMinor + transaction.amountMinor,
  })
  .where({
    userId: transaction.userId,
  })
  .execute()
      
return true
}
