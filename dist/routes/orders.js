"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@middlewares/auth");
const _errorhandler_1 = require("@errorhandler");
const orders_1 = require("@controllers/orders");
const admin_1 = require("@middlewares/admin");
const orderRoutes = (0, express_1.Router)();
orderRoutes.post('/', [auth_1.default], (0, _errorhandler_1.errorHandler)(orders_1.createOrder));
orderRoutes.get('/', [auth_1.default], (0, _errorhandler_1.errorHandler)(orders_1.listOrders));
orderRoutes.put('/:id/cancel', [auth_1.default], (0, _errorhandler_1.errorHandler)(orders_1.cancelOrder));
orderRoutes.get('/index', [auth_1.default, admin_1.default], (0, _errorhandler_1.errorHandler)(orders_1.listAllOrders));
orderRoutes.get('/users/:id', [auth_1.default, admin_1.default], (0, _errorhandler_1.errorHandler)(orders_1.listUserOrders));
orderRoutes.put('/:id/status', [auth_1.default, admin_1.default], (0, _errorhandler_1.errorHandler)(orders_1.changeStatus));
orderRoutes.get('/:id', [auth_1.default], (0, _errorhandler_1.errorHandler)(orders_1.getOrderById));
exports.default = orderRoutes;
