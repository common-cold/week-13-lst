"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToTokenDecimalUnit = convertToTokenDecimalUnit;
const mintTokens_1 = require("./mintTokens");
function convertToTokenDecimalUnit(amount) {
    const res = amount * mintTokens_1.TOKEN_DECIMALS;
    console.log(res);
    return res;
}
