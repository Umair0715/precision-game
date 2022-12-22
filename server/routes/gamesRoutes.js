const router = require('express').Router();
const { protect , isAdmin } = require('../middlewares/protect');
const gameController = require('../controllers/gameController');

router.route('/')
    .post(protect , isAdmin , gameController.createGame)

router.get('/all' , protect , gameController.getAllGames)

router.get('/featured-games' , gameController.getBuyerGames);
router.delete('/delete-game/:id' , protect , isAdmin , gameController.deleteGame);
    


module.exports = router;