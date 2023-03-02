

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




export const TableColumns: any = {
  ID: "id",
  IS_ENABLED: "is_enabled",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
};

export default TableColumns;
