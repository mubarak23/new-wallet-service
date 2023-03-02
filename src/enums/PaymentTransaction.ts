export enum PaymentTransactionTypes {
  EXTERNAL_TO_FUND_WALLET = "external_to_fund_wallet",

  ESCROW_TO_REFUND_BUYER = "escrow_to_refund_buyer",

  WALLET_FUNDS_WITHDRAWAL = "wallet_funds_withdrawal",
 
}

export enum PaymentTransactionStatus {
  UNPAID = "unpaid",
  PAID = "paid",
  FAILED = "failed",
}

export enum FinancialTransactionReferenceType {
  PAYSTACK = "paystack",
}
