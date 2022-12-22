const router = require('express').Router();
const { protect } = require('../middlewares/protect');
const reviewController = require('../controllers/reviewController');


router.route('/')
    .post(protect , reviewController.createReview);

module.exports = router;