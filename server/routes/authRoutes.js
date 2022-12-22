const router = require('express').Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/protect');


router.post('/register' , authController.register);
router.post('/login' , authController.login);
router.post('/forgot-password' , authController.forgotPassword);
router.post('/reset-password/:token' , authController.resetPassword);
router.get('/logout' , protect , authController.logout);
router.put('/update-password' , protect , authController.updatePassword);

module.exports = router;