const router = require('express').Router();
const { protect } = require('./../middlewares/protect');
const chatController = require('../controllers/chatController');

router.route('/')
    .post(protect , chatController.createChat)
    .get(protect , chatController.getMyChats);

router.route('/:chatId')
    .delete(protect , chatController.deleteChat);

router.post('/single-chat' , protect , chatController.getSingleChat)

module.exports = router;