
const { addProduct,getProduct, updateProduct } = require('./controllers/productController');
const { addUser , getUser, addProductToUserCart} = require('./controllers/userController');
const authMiddleware = require('./middleware.js/authMiddleware');

const router =require('express').Router();

router.post('/addProduct', authMiddleware, addProduct);

router.get('/getProduct', authMiddleware, getProduct);
router.put('/updateProduct', authMiddleware, updateProduct);


router.post('/addUser', authMiddleware, addUser);
router.get('/getUser', authMiddleware, getUser);
router.put('/addProductToUserCart', authMiddleware, addProductToUserCart);

module.exports = router;