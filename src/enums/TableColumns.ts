

export enum ShortUrlColumns {
  UUID = "uuid",
  UNIQUE_CODE = "unique_code",
  LONG_URL = "long_url",
  SHORT_URL = "short_url",
  IS_SOFT_DELETED = "is_soft_delete"
}


export enum UserColumns {
  UUID = "uuid",
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL_ADDRESS = "email_address",
  PHONE_NUMBER = "phone_number",
  PASSWORD_HASH = "password_hash",
  ROLE = 'role',
  IS_SOFT_DELETED = "is_soft_delete"
}

export enum WalletColumns {
  UUID = "uuid",
  USER_ID = "user_id",
  WALLET_BALANCE_MINOR = "wallet_balance_minor",
  CURRENCY = "currency",
  TYPE = "type",
  IS_SOFT_DELETED = "is_soft_delete"
}


export enum PaystackWebhooksColumns {
  UUID = 'webhook_uuid',
  TRANSACTION_UUID = 'transaction_uuid',
  PAYSTACK_PAYLOAD = 'paystack_payload',
  IS_PROCESSED = 'is_processed'
}

export enum PaystackDedicatedNubanColumns {
  UUID = "uuid",
  USER_ID = "user_id",
  DEDICATED_NUBAN_PAYLOAD = "dedicated_nuban_payload",

  BANK_ID = "",
  BANK_NAME = "",
  BANK_ACCOUNT_NUMBER = "",
  BANK_ACCOUNT_NAME = "",

  PAYSTACK_CUSTOMER_ID = "",
  PAYSTACK_INTEGRATION = "",
}

export enum PaystackTransferRecipientColumns {
  UUID = "uuid",
  ACCOUNT_NUMBER = "account_number",
  BANK_CODE = "bank_code",
  RECIPIENT_CODE = "recipient_code",
  CURRENCY = "currency",
}

export enum FinancialTransactionColumns {
  UUID = "transaction_uuid",
  USER_ID = "user_id",
  WALLET_ID = "wallet_id",

  REFERENCE = "reference",
  REFERENCE_TYPE = "reference_type",
  TRANSACTION_TYPE = "transaction_type",
  AMOUNT_MINOR = "amount_minor",
  PAID_STATUS = "paid_status",

  WALLET_BALANCE_MINOR_BEFORE = "wallet_balance_minor_before",
  WALLET_BALANCE_MINOR_AFTER = "wallet_balance_minor_after",

  PAID_AT = "paid_at",
  METADATA = "metadata",
  CURRENCY = "currency",
  DESCRIPTION = "description",
}



export const TableColumns: any = {
  ID: "id",
  IS_ENABLED: "is_enabled",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
};

export default TableColumns;
