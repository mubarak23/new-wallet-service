"use strict";
exports.__esModule = true;
var ShortUrlColumns;
(function (ShortUrlColumns) {
    ShortUrlColumns["UUID"] = "uuid";
    ShortUrlColumns["UNIQUE_CODE"] = "unique_code";
    ShortUrlColumns["LONG_URL"] = "long_url";
    ShortUrlColumns["SHORT_URL"] = "short_url";
    ShortUrlColumns["IS_SOFT_DELETED"] = "is_soft_delete";
})(ShortUrlColumns = exports.ShortUrlColumns || (exports.ShortUrlColumns = {}));
var UserColumns;
(function (UserColumns) {
    UserColumns["UUID"] = "uuid";
    UserColumns["FIRST_NAME"] = "firstName";
    UserColumns["LAST_NAME"] = "lastName";
    UserColumns["EMAIL_ADDRESS"] = "email_address";
    UserColumns["PHONE_NUMBER"] = "phone_number";
    UserColumns["PASSWORD_HASH"] = "password_hash";
    UserColumns["ROLE"] = "role";
    UserColumns["IS_SOFT_DELETED"] = "is_soft_delete";
})(UserColumns = exports.UserColumns || (exports.UserColumns = {}));
var WalletColumns;
(function (WalletColumns) {
    WalletColumns["UUID"] = "uuid";
    WalletColumns["USER_ID"] = "user_id";
    WalletColumns["WALLET_BALANCE_MINOR"] = "wallet_balance_minor";
    WalletColumns["CURRENCY"] = "currency";
    WalletColumns["TYPE"] = "type";
    WalletColumns["IS_SOFT_DELETED"] = "is_soft_delete";
})(WalletColumns = exports.WalletColumns || (exports.WalletColumns = {}));
exports.TableColumns = {
    ID: "id",
    IS_ENABLED: "is_enabled",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at"
};
exports["default"] = exports.TableColumns;
//# sourceMappingURL=TableColumns.js.map