"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.respondWithStatus = function (res, statusCode, data) {
    res.status(statusCode).send(data);
};
exports.respondWithError = function (res, exception) {
    var resData = {
        status: false,
        error: (exception === null || exception === void 0 ? void 0 : exception.error) || (exception === null || exception === void 0 ? void 0 : exception.message)
    };
    if (exception === null || exception === void 0 ? void 0 : exception.detailErrors) {
        resData.errors = exception === null || exception === void 0 ? void 0 : exception.detailErrors;
    }
    try {
        if (exception === null || exception === void 0 ? void 0 : exception.statusCode) {
            res.status(exception.statusCode).send(resData);
        }
        else {
            res.status(http_status_codes_1["default"].INTERNAL_SERVER_ERROR).send(resData);
        }
    }
    catch (e) {
        console.log(e.message);
        res.status(http_status_codes_1["default"].INTERNAL_SERVER_ERROR).send({
            status: false,
            error: e.message
        });
    }
};
exports.respondWithSimpleError = function (res, statusCode, message) {
    var resData = {
        status: false,
        error: message
    };
    try {
        res.status(statusCode).send(resData);
    }
    catch (e) {
        console.log(e.message);
        res.status(http_status_codes_1["default"].INTERNAL_SERVER_ERROR).send({
            status: false,
            error: e.message
        });
    }
};
exports.respondWithBadRequest = function (res, message) {
    exports.respondWithSimpleError(res, http_status_codes_1["default"].BAD_REQUEST, message);
};
exports.respondWithUnauthorized = function (res, message) {
    exports.respondWithSimpleError(res, http_status_codes_1["default"].UNAUTHORIZED, message);
};
exports.respondWithForbidden = function (res, message) {
    exports.respondWithSimpleError(res, http_status_codes_1["default"].FORBIDDEN, message);
};
exports.respondWithNotFound = function (res, message) {
    exports.respondWithSimpleError(res, http_status_codes_1["default"].NOT_FOUND, message);
};
exports.respondWithUnprocessableEntity = function (res, message) {
    exports.respondWithSimpleError(res, http_status_codes_1["default"].UNPROCESSABLE_ENTITY, message);
};
exports.respondWithServerError = function (res, message) {
    exports.respondWithSimpleError(res, http_status_codes_1["default"].INTERNAL_SERVER_ERROR, message);
};
exports.respondWithConflict = function (res, message) {
    exports.respondWithSimpleError(res, http_status_codes_1["default"].CONFLICT, message);
};
//# sourceMappingURL=express.js.map