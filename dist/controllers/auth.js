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
exports.me = exports.login = exports.signup = void 0;
const __1 = require("..");
const bcrypt_1 = require("bcrypt");
const jwt = require("jsonwebtoken");
const _secrets_1 = require("@secrets");
const GlobalValidator_1 = require("@validators/GlobalValidator");
const users_1 = require("@schemas/users");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    users_1.SignUpSchema.parse(req.body);
    const { email, password, name } = req.body;
    let user = yield __1.prismaClient.user.findFirst({ where: { email } });
    if (user) {
        throw new GlobalValidator_1.BadRequestsException('User already exists!', GlobalValidator_1.ErrorCode.USER_ALREADY_EXISTS);
    }
    user = yield __1.prismaClient.user.create({
        data: {
            name,
            email,
            password: (0, bcrypt_1.hashSync)(password, 10)
        }
    });
    res.json(user);
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield __1.prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        throw new GlobalValidator_1.NotFoundException('User  Not Found', GlobalValidator_1.ErrorCode.USER_NOT_FOUND);
    }
    if (!(0, bcrypt_1.compareSync)(password, user.password)) {
        throw new GlobalValidator_1.BadRequestsException('Incorrect password entered', GlobalValidator_1.ErrorCode.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({ userId: user.id }, _secrets_1.JWT_SECRET);
    res.json({ user, token });
});
exports.login = login;
// Return logged user
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.user);
});
exports.me = me;
