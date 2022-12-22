const router = require('express').Router();
const { createWithdrawRequest , getAllWithdrawRequests , getMyWithdrawRequests , updateWithdrawRequest } = require('../controllers/withdrawRequestController');
const { protect , isAdmin } = require('../middlewares/protect');

router.route('/')
    .post(protect , createWithdrawRequest )
    .get(protect , isAdmin , getAllWithdrawRequests)

router.get('/my' , protect , getMyWithdrawRequests);

router.route('/:id')
    .put(protect , updateWithdrawRequest)


module.exports = router;