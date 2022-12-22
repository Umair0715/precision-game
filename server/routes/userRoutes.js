const router = require('express').Router();
const { protect } = require('../middlewares/protect');
const userController = require('../controllers/userController');

// router.route('/')
    // .get(protect , userController.getAllUsers);

router.get('/search' , protect , userController.getSearchUser);
router.get('/admin' , protect , userController.getAdmin);


module.exports = router;