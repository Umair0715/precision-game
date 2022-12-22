const router = require('express').Router();
const { protect , isAdmin } = require('../../middlewares/protect');
const { createAdminProfit , getAdminProfit , updateAdminProfit } = require('../../controllers/admin/profitController');

router.route('/')
    .post(protect , isAdmin , createAdminProfit)
    .get(protect , isAdmin , getAdminProfit)
    .put(protect , isAdmin , updateAdminProfit)




module.exports = router;