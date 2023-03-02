"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var TableColumns_1 = require("../enums/TableColumns");
var Tables_1 = __importDefault(require("../enums/Tables"));
var core_1 = require("../utils/core");
var BaseEntity_1 = __importDefault(require("./BaseEntity"));
var Wallet = /** @class */ (function (_super) {
    __extends(Wallet, _super);
    function Wallet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wallet.prototype.initialize = function (userId, walletBalanceMinor, currency, type) {
        var now = core_1.utcNow();
        this.uuid = uuid_1.v4();
        this.userId = userId;
        this.walletBalanceMinor = walletBalanceMinor;
        this.currency = currency;
        this.type = type;
        this.createdAt = now;
        return this;
    };
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.WalletColumns.UUID, unique: true }),
        __metadata("design:type", String)
    ], Wallet.prototype, "uuid");
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.WalletColumns.USER_ID, nullable: false }),
        __metadata("design:type", Number)
    ], Wallet.prototype, "userId");
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.WalletColumns.WALLET_BALANCE_MINOR, nullable: false }),
        __metadata("design:type", Number)
    ], Wallet.prototype, "walletBalanceMinor");
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.WalletColumns.CURRENCY, nullable: false }),
        __metadata("design:type", String)
    ], Wallet.prototype, "currency");
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.WalletColumns.TYPE, nullable: false }),
        __metadata("design:type", String)
    ], Wallet.prototype, "type");
    __decorate([
        typeorm_1.Column({
            type: "boolean",
            name: TableColumns_1.WalletColumns.IS_SOFT_DELETED,
            nullable: false,
            "default": false
        }),
        __metadata("design:type", Boolean)
    ], Wallet.prototype, "isSoftDeleted");
    Wallet = __decorate([
        typeorm_1.Entity({ name: Tables_1["default"].WALLET })
    ], Wallet);
    return Wallet;
}(BaseEntity_1["default"]));
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map