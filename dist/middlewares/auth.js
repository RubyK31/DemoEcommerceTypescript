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
const jwt = require("jsonwebtoken");
const _secrets_1 = require("@secrets");
const __1 = require("..");
const GlobalValidator_1 = require("@validators/GlobalValidator");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return next(new GlobalValidator_1.UnauthorisedException("Unauthorized", GlobalValidator_1.ErrorCode.UNAUTHORISED));
    }
    try {
        const payload = jwt.verify(token, _secrets_1.JWT_SECRET);
        const user = yield __1.prismaClient.user.findFirst({ where: { id: payload.userId } });
        if (!user) {
            return next(new GlobalValidator_1.UnauthorisedException("Unauthorized", GlobalValidator_1.ErrorCode.UNAUTHORISED));
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new GlobalValidator_1.UnauthorisedException("Unauthorized", GlobalValidator_1.ErrorCode.UNAUTHORISED));
    }
});
exports.default = authMiddleware;
