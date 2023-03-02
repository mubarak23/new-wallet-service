"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var cors_1 = __importDefault(require("cors"));
var runCorsMiddleware = function (app) {
    // app.use(cors())
    var corsOptions = {
        origin: [
            'http://localhost:42965',
            "http://localhost:4200",
        ],
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(cors_1["default"](corsOptions));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.options('*', cors_1["default"]());
};
exports["default"] = runCorsMiddleware;
//# sourceMappingURL=cors.js.map