const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/protect');
const stripeController = require('../controllers/stripeController');

router.post('/create-checkout-session' , protect , stripeController.createCheckoutSession);
router.post('/create-subscription-checkout-session' , protect , stripeController.createSubscriptionCheckoutSession)
router.post('/webhook', express.raw({type: 'application/json'}) , stripeController.webhook);

module.exports = router;