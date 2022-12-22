const router = require('express').Router();
const { protect } = require('../middlewares/protect');
const { getAllTransactions , getMyTransactions } = require('../controllers/transactionController');

router.route('/')
    .get(protect , getAllTransactions)

router.route('/my')
    .get(protect , getMyTransactions);


module.exports = router;