"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var setupSwagger = function (app) {
    // if(process.env.NODE_ENV !== 'production') {
    app.use("/swagger-ui", swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json"
        }
    }));
    // }
};
exports["default"] = setupSwagger;
//# sourceMappingURL=swagger.js.map