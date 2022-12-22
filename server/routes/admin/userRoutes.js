const router = require('express').Router();
const { protect , isAdmin } = require('../../middlewares/protect');
const { getAllSellers , getAllBuyers , deleteUser } = require('../../controllers/admin/userController');

router.get('/buyers' , protect , isAdmin , getAllBuyers );
router.get('/sellers' , protect , isAdmin , getAllSellers);
router.delete('/delete-user/:id' , protect , isAdmin , deleteUser);

module.exports = router;