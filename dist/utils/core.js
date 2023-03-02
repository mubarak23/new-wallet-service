"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var moment_1 = __importDefault(require("moment"));
var bcrypt_1 = __importDefault(require("bcrypt"));
function isNullOrUndefined(obj) {
    return typeof obj === "undefined" || obj === null;
}
exports.isNullOrUndefined = isNullOrUndefined;
exports.utcNow = function () {
    return moment_1["default"].utc().toDate();
};
exports.standardizeDateTime = function (dateTime) {
    return moment_1["default"].utc(dateTime).toDate();
};
function rand(min, max) {
    var random = Math.random();
    return Math.floor(random * (max - min) + min);
}
exports.generateOtp = function (length) {
    if (process.env.NODE_ENV !== 'production') {
        return '111111111111111111'.substring(0, length);
    }
    var otp = '';
    var digits = '0123456789';
    while (otp.length < length) {
        var charIndex = rand(0, digits.length - 1);
        otp += digits[charIndex];
    }
    return otp;
};
exports.generatePasswordHash = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    var saltRounds, passwordSalt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                saltRounds = 10;
                return [4 /*yield*/, bcrypt_1["default"].genSalt(saltRounds)];
            case 1:
                passwordSalt = _a.sent();
                return [2 /*return*/, bcrypt_1["default"].hash(password, passwordSalt)];
        }
    });
}); };
exports.pickWithRoundRobin = function (lastIndex, candidateIds) {
    if (lastIndex === -1 || lastIndex === candidateIds.length - 1) {
        return candidateIds[0];
    }
    return candidateIds[lastIndex + 1];
};
exports.getOrderEntityReferenceNumber = function (entity) {
    return "" + (10000 + entity.id);
};
exports.handleAxiosRequestError = function (error) {
    if (error.response) {
        /*
        * The request was made and the server responded with a
        * status code that falls out of the range of 2xx
        */
        return error.response.data.error;
    }
    if (error.request) {
        /*
        * The request was made but no response was received, `error.request`
        * is an instance of XMLHttpRequest in the browser and an instance
        * of http.ClientRequest in Node.js
        */
        var errorMessage = 'The server seems down at the moment. Please try again later.';
        return errorMessage;
    }
    // Something happened in setting up the request and triggered an Error
    return error.message;
};
exports.jsonbArrayValue = function (array) {
    return "'" + JSON.stringify(array) + "'";
};
//# sourceMappingURL=core.js.map