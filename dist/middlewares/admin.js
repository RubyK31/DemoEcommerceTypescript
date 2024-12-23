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
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalValidator_1 = require("@validators/GlobalValidator");
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user && user.role == 'ADMIN') {
        next();
    }
    else {
        return next(new GlobalValidator_1.UnauthorisedException("Unauthorized, only administrator allowed to create a new product", GlobalValidator_1.ErrorCode.UNAUTHORISED));
    }
});
exports.default = adminMiddleware;
