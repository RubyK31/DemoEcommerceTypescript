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
exports.searchProducts = exports.getProductById = exports.listProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const __1 = require("..");
const GlobalValidator_1 = require("@validators/GlobalValidator");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield __1.prismaClient.product.create({
        data: Object.assign(Object.assign({}, req.body), { tags: req.body.tags.join(',') })
    });
    res.json(product);
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        if (product.tags) {
            product.tags = product.tags.join(',');
        }
        const updateProduct = yield __1.prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: product
        });
        res.json(updateProduct);
    }
    catch (err) {
        throw new GlobalValidator_1.NotFoundException('Product not found', GlobalValidator_1.ErrorCode.PRODUCT_NOT_FOUND);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield __1.prismaClient.product.delete({
            where: { id: +req.params.id }
        });
        res.json(product);
    }
    catch (error) {
        throw new GlobalValidator_1.NotFoundException('Product not found', GlobalValidator_1.ErrorCode.PRODUCT_NOT_FOUND);
    }
});
exports.deleteProduct = deleteProduct;
const listProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield __1.prismaClient.product.count();
    const products = yield __1.prismaClient.product.findMany({
        skip: parseInt(req.query.skip) || 0,
        take: 5
    });
    res.json({ count, data: products });
});
exports.listProduct = listProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield __1.prismaClient.product.findUniqueOrThrow({
            where: {
                id: +req.params.id
            }
        });
        res.json(product);
    }
    catch (error) {
        throw new GlobalValidator_1.NotFoundException('Product not found', GlobalValidator_1.ErrorCode.PRODUCT_NOT_FOUND);
    }
});
exports.getProductById = getProductById;
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const products = yield __1.prismaClient.product.findMany({
        where: {
            name: {
                search: (_a = req.query.q) === null || _a === void 0 ? void 0 : _a.toString()
            },
            description: {
                search: (_b = req.query.q) === null || _b === void 0 ? void 0 : _b.toString()
            },
            tags: {
                search: (_c = req.query.q) === null || _c === void 0 ? void 0 : _c.toString()
            }
        }
    });
    res.json(products);
});
exports.searchProducts = searchProducts;
