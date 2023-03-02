import { PaymentTransactionTypes } from "./PaymentTransaction"

enum TransactionFlowType {
  IN = 'in',
  OUT = 'out',
}


export const getTransactionFlowType = (transactionType: PaymentTransactionTypes) => {
  if( transactionType === PaymentTransactionTypes.WALLET_FUNDS_WITHDRAWAL) {
    return TransactionFlowType.OUT
  } 
    return TransactionFlowType.IN
  
}

export default TransactionFlowType
