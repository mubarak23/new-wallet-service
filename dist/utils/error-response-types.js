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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var DetailedError = /** @class */ (function () {
    function DetailedError(message, standardErrorCode) {
        this.message = message;
        this.standardizedErrorCode = standardErrorCode;
    }
    return DetailedError;
}());
exports.DetailedError = DetailedError;
var BaseServiceException = /** @class */ (function (_super) {
    __extends(BaseServiceException, _super);
    function BaseServiceException(error, detailedErrors) {
        var _this = _super.call(this, error) || this;
        _this.error = error;
        _this.detailErrors = detailedErrors;
        if (!error && detailedErrors.length) {
            _this.error = detailedErrors[0].message;
        }
        _this.message = _this.error;
        _this.statusCode = http_status_codes_1["default"].BAD_REQUEST;
        return _this;
    }
    return BaseServiceException;
}(Error));
exports.BaseServiceException = BaseServiceException;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(error, detailedErrors) {
        if (detailedErrors === void 0) { detailedErrors = []; }
        var _this = _super.call(this, error, detailedErrors) || this;
        _this.statusCode = http_status_codes_1["default"].BAD_REQUEST;
        return _this;
    }
    return BadRequestError;
}(BaseServiceException));
exports.BadRequestError = BadRequestError;
var UnauthorizedRequestError = /** @class */ (function (_super) {
    __extends(UnauthorizedRequestError, _super);
    function UnauthorizedRequestError(error, detailedErrors) {
        if (detailedErrors === void 0) { detailedErrors = []; }
        var _this = _super.call(this, error, detailedErrors) || this;
        _this.statusCode = http_status_codes_1["default"].UNAUTHORIZED;
        return _this;
    }
    return UnauthorizedRequestError;
}(BaseServiceException));
exports.UnauthorizedRequestError = UnauthorizedRequestError;
var ForbiddenRequestError = /** @class */ (function (_super) {
    __extends(ForbiddenRequestError, _super);
    function ForbiddenRequestError(error, detailedErrors) {
        if (detailedErrors === void 0) { detailedErrors = []; }
        var _this = _super.call(this, error, detailedErrors) || this;
        _this.statusCode = http_status_codes_1["default"].FORBIDDEN;
        return _this;
    }
    return ForbiddenRequestError;
}(BaseServiceException));
exports.ForbiddenRequestError = ForbiddenRequestError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(error, detailedErrors) {
        if (detailedErrors === void 0) { detailedErrors = []; }
        var _this = _super.call(this, error, detailedErrors) || this;
        _this.statusCode = http_status_codes_1["default"].NOT_FOUND;
        return _this;
    }
    return NotFoundError;
}(BaseServiceException));
exports.NotFoundError = NotFoundError;
var UnprocessableEntityError = /** @class */ (function (_super) {
    __extends(UnprocessableEntityError, _super);
    function UnprocessableEntityError(error, detailedErrors) {
        if (detailedErrors === void 0) { detailedErrors = []; }
        var _this = _super.call(this, error, detailedErrors) || this;
        _this.statusCode = http_status_codes_1["default"].UNPROCESSABLE_ENTITY;
        return _this;
    }
    return UnprocessableEntityError;
}(BaseServiceException));
exports.UnprocessableEntityError = UnprocessableEntityError;
var ConflictError = /** @class */ (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(error, detailedErrors) {
        if (detailedErrors === void 0) { detailedErrors = []; }
        var _this = _super.call(this, error, detailedErrors) || this;
        _this.statusCode = http_status_codes_1["default"].CONFLICT;
        return _this;
    }
    return ConflictError;
}(BaseServiceException));
exports.ConflictError = ConflictError;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(error, detailedErrors) {
        if (detailedErrors === void 0) { detailedErrors = []; }
        var _this = _super.call(this, error, detailedErrors) || this;
        _this.statusCode = http_status_codes_1["default"].FORBIDDEN;
        return _this;
    }
    return ServerError;
}(BaseServiceException));
exports.ServerError = ServerError;
//# sourceMappingURL=error-response-types.js.map