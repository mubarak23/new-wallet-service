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
exports.__esModule = true;
var UrlShortLer_1 = require("../entity/UrlShortLer");
var db_1 = require("../db");
var tsoa_1 = require("tsoa");
var error_response_types_1 = require("../utils/error-response-types");
var UrlShortLerController = /** @class */ (function () {
    function UrlShortLerController() {
    }
    UrlShortLerController.prototype.handleFetchUrlDetails = function (uniqueCode) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, urlRepo, urlDetails, resData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.getFreshConnection()];
                    case 1:
                        connection = _a.sent();
                        urlRepo = connection.getRepository(UrlShortLer_1.UrlShortLer);
                        return [4 /*yield*/, urlRepo.findOne({ uniqueCode: uniqueCode })];
                    case 2:
                        urlDetails = _a.sent();
                        if (!urlDetails) {
                            throw new error_response_types_1.UnprocessableEntityError('Url shortler detail does not exits');
                        }
                        resData = {
                            status: true,
                            data: urlDetails,
                            message: "URL Shortler Details"
                        };
                        return [2 /*return*/, resData];
                }
            });
        });
    };
    //     @Post('/new')
    //     public async handleNewUrlShortler(@Body() reqBody: INewUrlShortLer): Promise<IServerResponse<void>>{
    //     const { longUrl } = reqBody
    //     const connection = await getFreshConnection()
    //     const urlRepo = connection.getRepository(UrlShortLer)
    //     const uniqueCode = nanoid(5)
    //     const shortUrl = process.env.SHORT_URL ||  `http://localhost:3200/${uniqueCode}`
    //     const urlExist = await urlRepo.findOne({ longUrl})
    //     if(urlExist){
    //         throw new BadRequestError(' URL shortler Already Exist')
    //     }
    //     const newURLShortLer = new UrlShortLer().initialize(uniqueCode, longUrl, shortUrl)
    //     await urlRepo.save(newURLShortLer)
    //     const resData :  IServerResponse<void>  ={
    //         status: true
    //     }
    //     return resData
    // }
    UrlShortLerController.prototype.handleUpdateUrlShortler = function (reqBody) {
        return __awaiter(this, void 0, void 0, function () {
            var longUrl, uniqueCode, connection, urlRepo, shortUrl, urlExist, resData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        longUrl = reqBody.longUrl, uniqueCode = reqBody.uniqueCode;
                        return [4 /*yield*/, db_1.getFreshConnection()];
                    case 1:
                        connection = _a.sent();
                        urlRepo = connection.getRepository(UrlShortLer_1.UrlShortLer);
                        shortUrl = process.env.SHORT_URL || "http://localhost:3200/" + uniqueCode;
                        return [4 /*yield*/, urlRepo.findOne({ uniqueCode: uniqueCode })];
                    case 2:
                        urlExist = _a.sent();
                        if (!urlExist) {
                            throw new error_response_types_1.BadRequestError(' URL shortler Does Not Exist');
                        }
                        return [4 /*yield*/, urlRepo.createQueryBuilder()
                                .update(UrlShortLer_1.UrlShortLer)
                                .set({ longUrl: longUrl })
                                .where({ uniqueCode: uniqueCode })
                                .execute()];
                    case 3:
                        _a.sent();
                        resData = {
                            status: true
                        };
                        return [2 /*return*/, resData];
                }
            });
        });
    };
    UrlShortLerController.prototype.handleDeleteUrl = function (uniqueCode) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, urlRepo, urlDetails, resData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.getFreshConnection()];
                    case 1:
                        connection = _a.sent();
                        urlRepo = connection.getRepository(UrlShortLer_1.UrlShortLer);
                        return [4 /*yield*/, urlRepo.findOne({ uniqueCode: uniqueCode })];
                    case 2:
                        urlDetails = _a.sent();
                        if (!urlDetails) {
                            throw new error_response_types_1.UnprocessableEntityError('Url shortler detail does not exits');
                        }
                        return [4 /*yield*/, urlRepo.createQueryBuilder()
                                .update(UrlShortLer_1.UrlShortLer)
                                .set({ isSoftDeleted: true })
                                .where({ uniqueCode: uniqueCode })
                                .execute()];
                    case 3:
                        _a.sent();
                        resData = {
                            status: true,
                            message: "URL Deleted"
                        };
                        return [2 /*return*/, resData];
                }
            });
        });
    };
    __decorate([
        tsoa_1.Get('/:uniqueCode'),
        __param(0, tsoa_1.Path("uniqueCode")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], UrlShortLerController.prototype, "handleFetchUrlDetails");
    __decorate([
        tsoa_1.Put('/update'),
        __param(0, tsoa_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], UrlShortLerController.prototype, "handleUpdateUrlShortler");
    __decorate([
        tsoa_1.Delete('/:uniqueCode'),
        __param(0, tsoa_1.Path("uniqueCode")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], UrlShortLerController.prototype, "handleDeleteUrl");
    UrlShortLerController = __decorate([
        tsoa_1.Route("/api/url"),
        tsoa_1.Tags("URL")
    ], UrlShortLerController);
    return UrlShortLerController;
}());
exports.UrlShortLerController = UrlShortLerController;
//# sourceMappingURL=UrlShortLerController.js.map