import { PaymentInitializeVariant } from "../enums/PaymentInilizeVariant";

export interface PaymentInitialize {
  paymentVariant: PaymentInitializeVariant,

  amountMajor?: number | null
}
