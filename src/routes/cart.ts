import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { addItemToCart, cartItemsCount, changeQuantity, deletetemFromCart, getCart } from '../controllers/cart'
const cartRoutes = Router();

cartRoutes.post('/', [authMiddleware], errorHandler(addItemToCart))
cartRoutes.get('/count',[authMiddleware],errorHandler(cartItemsCount))
cartRoutes.get('/', [authMiddleware], errorHandler(getCart))
cartRoutes.delete('/:id', [authMiddleware], errorHandler(deletetemFromCart))
cartRoutes.put('/:id',[authMiddleware],errorHandler(changeQuantity))

export default cartRoutes