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
exports.listUserOrders = exports.changeStatus = exports.listAllOrders = exports.getOrderById = exports.cancelOrder = exports.listOrders = exports.createOrder = void 0;
const __1 = require("..");
const GlobalValidator_1 = require("@validators/GlobalValidator");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    
    Create a transaction
    List all items in the cart and proceed only if cart is not empty
    Calculate the total amount
    Fetch address of the user
    To define computed field for formatted address on address module
    Create an order
    Create the order event
    
    */
    return yield __1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const cartItems = yield tx.cartItem.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                product: true
            }
        });
        if (cartItems.length == 0) {
            return res.json({ message: "Cart is empty" });
        }
        const price = cartItems.reduce((prev, current) => {
            return prev + (current.quantity * +current.product.price);
        }, 0);
        const address = yield tx.address.findFirst({
            where: {
                id: req.user.defaultShippingAddress
            }
        });
        if (!address) {
            throw new Error("Default shipping address not found.");
        }
        const order = yield tx.order.create({
            data: {
                userId: req.user.id,
                netAmount: price,
                address: address.formattedAddress,
                products: {
                    create: cartItems.map((cart) => {
                        return {
                            productId: cart.productId,
                            quantity: cart.quantity
                        };
                    })
                }
            }
        });
        const orderEvent = yield tx.orderEvent.create({
            data: {
                orderId: order.id,
            }
        });
        yield tx.cartItem.deleteMany({
            where: {
                userId: req.user.id
            }
        });
        return res.json(order);
    }));
});
exports.createOrder = createOrder;
const listOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield __1.prismaClient.order.findMany({
        where: {
            userId: req.user.id
        },
    });
    res.json(orders);
});
exports.listOrders = listOrders;
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield __1.prismaClient.order.update({
            where: {
                id: +req.params.id
            },
            data: {
                status: 'CANCELLED'
            }
        });
        yield __1.prismaClient.orderEvent.create({
            data: {
                orderId: order.id,
                status: "CANCELLED"
            }
        });
        res.json(order);
    }
    catch (err) {
        throw new GlobalValidator_1.NotFoundException('Order not found', GlobalValidator_1.ErrorCode.ORDER_NOT_FOUND);
    }
});
exports.cancelOrder = cancelOrder;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield __1.prismaClient.order.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            include: {
                products: true,
                events: true
            }
        });
        res.json(order);
    }
    catch (err) {
        throw new GlobalValidator_1.NotFoundException('Order not found', GlobalValidator_1.ErrorCode.ORDER_NOT_FOUND);
    }
});
exports.getOrderById = getOrderById;
const listAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let whereClause = {};
    const status = req.params.status;
    if (status) {
        whereClause = {
            status
        };
    }
    const orders = yield __1.prismaClient.order.findMany({
        where: whereClause,
        skip: 0,
        take: 5
    });
    res.json(orders);
});
exports.listAllOrders = listAllOrders;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield __1.prismaClient.order.update({
            where: {
                id: +req.params.id
            },
            data: {
                status: req.body.status
            }
        });
        res.json(order);
        yield __1.prismaClient.orderEvent.create({
            data: {
                orderId: order.id,
                status: req.body.status
            }
        });
    }
    catch (err) {
        throw new GlobalValidator_1.NotFoundException('Order not found', GlobalValidator_1.ErrorCode.ORDER_NOT_FOUND);
    }
});
exports.changeStatus = changeStatus;
const listUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let whereClause = {
            user: +req.params.id
        };
        const status = req.query.status;
        if (status) {
            whereClause = Object.assign(Object.assign({}, whereClause), { status });
        }
    }
    catch (err) {
        throw new GlobalValidator_1.NotFoundException('Order not found', GlobalValidator_1.ErrorCode.ORDER_NOT_FOUND);
    }
});
exports.listUserOrders = listUserOrders;
