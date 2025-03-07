const { addProduct, getProduct, updateProduct } = require('./controllers/userControllers');
const authMiddleware = require('./middleware.js/authMiddleware');

const router =require('express').Router();

router.post('/addProduct', authMiddleware, addProduct);

router.get('/getProduct', authMiddleware, getProduct);

router.put('/updateProduct', authMiddleware, updateProduct);


module.exports = router;