
const { addProduct,getProduct } = require('./controllers/productController');
const authMiddleware = require('./middleware.js/authMiddleware');

const router =require('express').Router();

router.post('/addProduct', authMiddleware, addProduct);

router.get('/getProduct', authMiddleware, getProduct);

module.exports = router;