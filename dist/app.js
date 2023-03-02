"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var middleware_1 = __importDefault(require("./middleware"));
process.env.TZ = "UTC";
var app = express_1["default"]();
middleware_1["default"](app);
exports["default"] = app;
//# sourceMappingURL=app.js.map