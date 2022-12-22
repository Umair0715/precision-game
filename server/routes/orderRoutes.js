const router = require('express').Router();
const { protect } = require('../middlewares/protect');
const orderController = require('../controllers/orderController');


router.route('/')
    .post(protect , orderController.createOrder)
    .get(protect , orderController.getAllOrders)

router.get('/my' , protect , orderController.getMyOrders);
router.get('/seller-orders' , protect , orderController.getSellerOrders);

router.route('/:id')
    .get(protect , orderController.getSingleOrder)
    .put(protect , orderController.updateOrder)
    .delete(protect , orderController.deleteOrder);

router.post('/isPaid' , protect , orderController.checkAccountPaid)

module.exports = router;