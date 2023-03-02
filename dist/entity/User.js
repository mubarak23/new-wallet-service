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
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.initialize = function (firstName, lastName, emailAddress, phoneNumber, passwordHash, role) {
        var now = core_1.utcNow();
        this.uuid = uuid_1.v4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.passwordHash = passwordHash;
        this.role = role;
        this.createdAt = now;
        return this;
    };
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.UserColumns.UUID, unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "uuid");
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.UserColumns.FIRST_NAME, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "firstName");
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.UserColumns.LAST_NAME, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "lastName");
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.UserColumns.EMAIL_ADDRESS, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "emailAddress");
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.UserColumns.PHONE_NUMBER, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "phoneNumber");
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.UserColumns.PASSWORD_HASH, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "passwordHash");
    __decorate([
        typeorm_1.Column({ name: TableColumns_1.UserColumns.ROLE, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "role");
    __decorate([
        typeorm_1.Column({
            type: "boolean",
            name: TableColumns_1.UserColumns.IS_SOFT_DELETED,
            nullable: false,
            "default": false
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isSoftDeleted");
    User = __decorate([
        typeorm_1.Entity({ name: Tables_1["default"].USERS })
    ], User);
    return User;
}(BaseEntity_1["default"]));
exports.User = User;
//# sourceMappingURL=User.js.map