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
exports.cartItemsCount = exports.getCart = exports.changeQuantity = exports.deletetemFromCart = exports.addItemToCart = void 0;
const cart_1 = require("@schemas/cart");
const __1 = require("..");
const GlobalValidator_1 = require("../validators/GlobalValidator");
const addItemToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = cart_1.CreateCartSchema.parse(req.body);
    let product;
    if (validatedData.productId) {
        try {
            product = yield __1.prismaClient.product.findFirstOrThrow({
                where: {
                    id: validatedData.productId
                }
            });
        }
        catch (error) {
            throw new GlobalValidator_1.NotFoundException('Product not found', GlobalValidator_1.ErrorCode.PRODUCT_NOT_FOUND);
        }
        const cart = yield __1.prismaClient.cartItem.create({
            data: {
                userId: req.user.id,
                productId: product.id,
                quantity: validatedData.quantity
            }
        });
        res.json(cart);
    }
});
exports.addItemToCart = addItemToCart;
const deletetemFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield __1.prismaClient.cartItem.delete({
        where: {
            id: +req.params.id
        }
    });
    res.json({ success: true });
});
exports.deletetemFromCart = deletetemFromCart;
const changeQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = cart_1.ChangeQuantitySchema.parse(req.body);
    const updatedCart = yield __1.prismaClient.cartItem.update({
        where: {
            id: +req.params.id
        },
        data: {
            quantity: validatedData.quantity
        }
    });
    res.json(updatedCart);
});
exports.changeQuantity = changeQuantity;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield __1.prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    });
    res.json(cart);
});
exports.getCart = getCart;
const cartItemsCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartCount = yield __1.prismaClient.cartItem.count({
        where: {
            userId: req.user.id
        }
    });
    res.json({ count: cartCount });
});
exports.cartItemsCount = cartItemsCount;
