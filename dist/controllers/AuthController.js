"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var bcrypt_1 = __importDefault(require("bcrypt"));
var User_1 = require("../entity/User");
var db_1 = require("../db");
var tsoa_1 = require("tsoa");
var TokenService = __importStar(require("../services/tokenService"));
var WalletService = __importStar(require("../services/walletService"));
var AuthService = __importStar(require("../services/authService"));
var error_response_types_1 = require("../utils/error-response-types");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.agentSignup = function (reqBody) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, userRepo, exitingUser, _a, saveUser, signUpToken, wallet, resData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, db_1.getFreshConnection()];
                    case 1:
                        connection = _b.sent();
                        userRepo = connection.getRepository(User_1.User);
                        return [4 /*yield*/, userRepo.findOne({ emailAddress: reqBody.emailAddress, phoneNumber: reqBody.phoneNumber })];
                    case 2:
                        exitingUser = _b.sent();
                        if (exitingUser) {
                            throw new error_response_types_1.BadRequestError("The Email Address and Phone Number has been used");
                        }
                        return [4 /*yield*/, AuthService.authSignup(reqBody)];
                    case 3:
                        _a = _b.sent(), saveUser = _a.saveUser, signUpToken = _a.signUpToken, wallet = _a.wallet;
                        resData = {
                            status: true,
                            data: { token: signUpToken, user: saveUser, wallet: wallet },
                            message: "User Account Created Successfully"
                        };
                        return [2 /*return*/, resData];
                }
            });
        });
    };
    AuthController.prototype.agentSignin = function (reqBody) {
        return __awaiter(this, void 0, void 0, function () {
            var emailAddress, password, connection, userRepo, userExist, match, signinToken, wallet, resData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emailAddress = reqBody.emailAddress, password = reqBody.password;
                        return [4 /*yield*/, db_1.getFreshConnection()];
                    case 1:
                        connection = _a.sent();
                        userRepo = connection.getRepository(User_1.User);
                        return [4 /*yield*/, userRepo.findOne({ emailAddress: emailAddress })];
                    case 2:
                        userExist = _a.sent();
                        if (!userExist) {
                            throw new error_response_types_1.BadRequestError('Invalid Login credentials');
                        }
                        return [4 /*yield*/, bcrypt_1["default"].compare(password, userExist.passwordHash)];
                    case 3:
                        match = _a.sent();
                        if (!match) {
                            throw new error_response_types_1.UnauthorizedRequestError("User credentials are wrong.");
                        }
                        return [4 /*yield*/, TokenService.getAccessToken(userExist)];
                    case 4:
                        signinToken = _a.sent();
                        return [4 /*yield*/, WalletService.userWallet(userExist.id)];
                    case 5:
                        wallet = _a.sent();
                        resData = {
                            status: true,
                            data: { token: signinToken.token, user: userExist, wallet: wallet, refreshToken: signinToken.refreshToken },
                            message: 'Login Successfully'
                        };
                        return [2 /*return*/, resData];
                }
            });
        });
    };
    __decorate([
        tsoa_1.Post("/users/signup"),
        __param(0, tsoa_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "agentSignup");
    __decorate([
        tsoa_1.Post("/users/signin"),
        __param(0, tsoa_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AuthController.prototype, "agentSignin");
    AuthController = __decorate([
        tsoa_1.Route("/api/auth"),
        tsoa_1.Tags("Auth Service")
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map