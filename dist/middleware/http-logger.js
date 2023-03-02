"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var logger_1 = __importDefault(require("../logger"));
function tryToParseJSON(item) {
    try {
        return JSON.parse(item);
    }
    catch (e) {
        return item;
    }
}
var middlewareHandler = function (req, res, next) {
    res.on('finish', function () {
        var requestBody = tryToParseJSON(req.body);
        var responseBody = tryToParseJSON(res.body);
        logger_1["default"].info({
            endPoint: req.originalUrl,
            request: {
                headers: req.headers,
                body: requestBody
            },
            response: {
                statusCode: res.statusCode,
                body: responseBody
            }
        });
    });
    next();
};
exports["default"] = middlewareHandler;
//# sourceMappingURL=http-logger.js.map