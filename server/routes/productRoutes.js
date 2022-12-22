const router = require('express').Router();
const { protect } = require('../middlewares/protect');
const productController = require('../controllers/productController');

router.route('/')
    .post(protect , productController.createProduct)
    .get(protect , productController.getAllProducts)
    
router.get('/my' , protect , productController.getSellerProducts)

router.get('/random-services' , productController.getRandomServices);

router.route('/:id')
    .put(protect , productController.updateProduct )
    .delete(protect , productController.deleteProduct)
    .get(protect , productController.getSingleProduct);



module.exports = router;