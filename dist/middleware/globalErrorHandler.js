"use strict";
exports.__esModule = true;
var runtime_1 = require("@tsoa/runtime");
exports.handleErrors = function (app) {
    app.use(function errorHandler(err, req, res, next) {
        if (err instanceof runtime_1.ValidateError) {
            return res.status(422).json({
                status: false,
                message: "Validation Failed",
                details: err === null || err === void 0 ? void 0 : err.fields
            });
        }
        if (err.statusCode) { // substitude for instanceof BaseServiceException
            console.log(err.message);
            console.log(err.stack);
            return res.status(err.statusCode).json({
                status: false,
                error: err.message
            });
        }
        if (err instanceof Error) {
            console.log(err.message);
            console.log(err.stack);
            return res.status(500).json({
                status: false,
                error: 'Internal Server Error'
            });
        }
        next();
    });
};
//# sourceMappingURL=globalErrorHandler.js.map