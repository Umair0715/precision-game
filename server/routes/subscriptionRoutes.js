const router = require('express').Router();
const { getMySubscription } = require('../controllers/subscriptionController');
const { protect } = require('../middlewares/protect');

router.get('/my' , protect , getMySubscription );

module.exports = router;