"use strict";
exports.__esModule = true;
var tslog_1 = require("tslog");
var log = new tslog_1.Logger({
    name: "Support Service",
    maskValuesOfKeys: ['password', 'token', 'x-access-token']
});
exports["default"] = log;
//# sourceMappingURL=logger.js.map