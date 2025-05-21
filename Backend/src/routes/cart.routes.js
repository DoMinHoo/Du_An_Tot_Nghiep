
import { Router } from 'express';
import { addToCart, getCart, updateItem, removeItem, clearCart } from '../controllers/cart.controllers';
import { authMiddleware } from '../middleware/auth';

const cartRouter = Router();

cartRouter.use(authMiddleware);

cartRouter.post('/', addToCart);
cartRouter.get('/', getCart);
cartRouter.put('/:productId', updateItem);
cartRouter.delete('/:productId', removeItem);
cartRouter.delete('/', clearCart);

export default cartRouter;
