const router = require('express').Router();
const { getAllOrders } = require('../../controllers/admin/orderController');
const { protect , isAdmin } = require('../../middlewares/protect');

router.route('/')
    .get(protect , isAdmin , getAllOrders );

module.exports = router;