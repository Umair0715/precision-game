const router = require('express').Router();
const { getAllProducts } = require('../../controllers/admin/productController');
const { protect , isAdmin } = require('../../middlewares/protect');

router.route('/')
    .get(protect , isAdmin , getAllProducts );

module.exports = router;