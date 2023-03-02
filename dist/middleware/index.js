"use strict";
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
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var Sentry = __importStar(require("@sentry/node"));
var sentry_1 = __importDefault(require("./sentry"));
var bodyParser_1 = __importDefault(require("./bodyParser"));
var cors_1 = __importDefault(require("./cors"));
var http_logger_1 = __importDefault(require("./http-logger"));
var swagger_1 = __importDefault(require("./swagger"));
var iniitializeMiddlewares = function (app) {
    // The Sentry request handler must be the first middleware on the app
    sentry_1["default"](app);
    app.use(helmet_1["default"]());
    bodyParser_1["default"](app);
    cors_1["default"](app);
    if (process.env.NODE_ENV === 'production') {
        app.use(http_logger_1["default"]);
    }
    // This is key to make swagger work
    app.use(express_1["default"].static("public"));
    app.set('views', __dirname + "/public");
    swagger_1["default"](app);
    // The error handler must be before any other error middleware and after all controllers
    app.use(Sentry.Handlers.errorHandler());
};
exports["default"] = iniitializeMiddlewares;
//# sourceMappingURL=index.js.map