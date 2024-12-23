"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@controllers/auth");
const _errorhandler_1 = require("@errorhandler");
const auth_2 = require("@middlewares/auth");
const authRoutes = (0, express_1.Router)();
authRoutes.post('/signup', (0, _errorhandler_1.errorHandler)(auth_1.signup));
authRoutes.post('/login', (0, _errorhandler_1.errorHandler)(auth_1.login));
authRoutes.get('/me', [auth_2.default], (0, _errorhandler_1.errorHandler)(auth_1.me));
exports.default = authRoutes;