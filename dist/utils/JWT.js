"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var jwt = __importStar(require("jsonwebtoken"));
var verify = function (token, secret) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, secret, function (err, decode) {
            if (err) {
                reject(err);
                return;
            }
            resolve(decode);
        });
    });
};
exports["default"] = verify;
//# sourceMappingURL=JWT.js.map