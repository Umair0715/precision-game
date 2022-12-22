const router = require('express').Router();
const paymentController = require('../controllers/paymentController');

router.post('/pay' , paymentController.createPayment);
router.post('/payment-success' , paymentController.paymentSuccess);

module.exports = router;