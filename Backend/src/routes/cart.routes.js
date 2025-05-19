
import { Router } from 'express';
import { addToCart, getCart, updateItem, removeItem, clearCart } from '../controllers/cart.controllers';
// const authMiddleware = require('../middlewares/auth'); // Giả định middleware đã có

const cartRouter = Router();
// router.use(authMiddleware);

cartRouter.post('/', addToCart);
cartRouter.get('/', getCart);
cartRouter.put('/:productId', updateItem);
cartRouter.delete('/:productId', removeItem);
cartRouter.delete('/', clearCart);

export default cartRouter;
