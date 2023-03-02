"use strict";
exports.__esModule = true;
var core_1 = require("./core");
// export class ColumnNumericTransformer {
//   to(data: number): number {
//     return data;
//   }
//   from(data: string): number {
//     return parseFloat(data);
//   }
// }
// https://github.com/typeorm/typeorm/issues/873
var ColumnNumericTransformer = /** @class */ (function () {
    function ColumnNumericTransformer() {
    }
    ColumnNumericTransformer.prototype.to = function (data) {
        if (!core_1.isNullOrUndefined(data)) {
            return data;
        }
        return null;
    };
    ColumnNumericTransformer.prototype.from = function (data) {
        if (!core_1.isNullOrUndefined(data)) {
            var res = parseFloat(data);
            if (isNaN(res)) {
                return null;
            }
            return res;
        }
        return null;
    };
    return ColumnNumericTransformer;
}());
exports.ColumnNumericTransformer = ColumnNumericTransformer;
var ColumnNumericArrayTransformer = /** @class */ (function () {
    function ColumnNumericArrayTransformer() {
    }
    ColumnNumericArrayTransformer.prototype.to = function (data) {
        return data;
    };
    ColumnNumericArrayTransformer.prototype.from = function (data) {
        return data ? data.map(function (x) { return parseInt(x); }) : undefined;
    };
    return ColumnNumericArrayTransformer;
}());
exports.ColumnNumericArrayTransformer = ColumnNumericArrayTransformer;
//# sourceMappingURL=transformers.js.map