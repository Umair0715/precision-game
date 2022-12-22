const router = require('express').Router();
const { protect } = require('../middlewares/protect');
const walletController = require('../controllers/walletController');


router.route('/')
    .get(protect , walletController.getMyWallet);

module.exports = router;