const { query } = require('express');
const authMiddleware = require('./middleware.js/authMiddleware');

const router = require('express').Router();

router.get('/health', (req, res) => {
    //console.log("api call");
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "API is working fine........."
    });
});


router.get('/users', authMiddleware, (req, res) => {
    const users = [
        {
            _id: 1,
            name: 'Vidya',
            email: 'vidya@gmail.com'
        },
        {
            _id: 2,
            name: 'Arun',
            email: 'arun@gmail.com'
        },
        {
            _id: 3,
            name: 'Irene',
            email: 'irene@gmail.com'
        },
        {
            _id: 4,
            name: 'Balu',
            email: 'balu@gmail.com'
        }
    ]
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "users data retrieve successfully",
        count: users?.length,
        data: users
    });
})

router.post('/addUser', (req, res) => {
    console.log("addUser API call", req.body);

    if (req.body?.user) {
        console.log("user data is available ", req.body.user);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "user added successfully",
            data: req.body.user
        });
    } else {
        console.log("user data missing:");
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: "invalid request, user data is missing"
        });
    }

});
router.delete('/deleteUser', (req, res) => {
    console.log("deleted user API call", req.query);

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "user deleted successfully",
        query: req.query
    })
})


module.exports = router;