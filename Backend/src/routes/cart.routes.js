    const express = require('express');
    const router = express.Router();
    const cartController = require('../controllers/cart.controllers');
    // const authMiddleware = require('../middlewares/auth'); // Giả định middleware đã có

    // router.use(authMiddleware);

    router.post('/', cartController.addToCart);
    router.get('/', cartController.getCart);
    router.put('/:productId', cartController.updateItem);
    router.delete('/:productId', cartController.removeItem);
    router.delete('/', cartController.clearCart);

    module.exports = router;
