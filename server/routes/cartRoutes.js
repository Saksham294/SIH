const { Router } = require('express');
const {get_cart_items,add_cart_item,delete_item} = require('../controllers/cartController');
const router = Router();

router.get('/cart/:id',get_cart_items);
router.post('/cart/:id',add_cart_item);
router.delete('/cart/:id/:productId', delete_item);

module.exports = router;