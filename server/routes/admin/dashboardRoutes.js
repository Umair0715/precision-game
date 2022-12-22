const router = require('express').Router();
const { getDashboardDetails } = require('../../controllers/admin/dashboardController');
const { protect , isAdmin } = require('../../middlewares/protect');

router.route('/')
    .get(protect , isAdmin , getDashboardDetails);

module.exports = router;