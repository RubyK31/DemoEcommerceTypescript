import {Router} from 'express';
import { errorHandler } from '@errorhandler';
import { createProduct, deleteProduct, getProductById, listProduct, searchProducts, updateProduct } from '@controllers/products';
import authMiddleware from '@middlewares/auth';
import adminMiddleware from '@middlewares/admin';

const productsRoutes: Router = Router()

productsRoutes.post('/',[authMiddleware, adminMiddleware],errorHandler(createProduct))
productsRoutes.put('/:id',[authMiddleware, adminMiddleware],errorHandler(updateProduct))
productsRoutes.delete('/:id',[authMiddleware, adminMiddleware],errorHandler(deleteProduct))
productsRoutes.get('/',[authMiddleware, adminMiddleware],errorHandler(listProduct))
productsRoutes.get('/search',[authMiddleware],errorHandler(searchProducts))
productsRoutes.get('/:id',[authMiddleware, adminMiddleware],errorHandler(getProductById))

export default productsRoutes