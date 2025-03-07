const products = [
    {
        "_id": "1",
        "name": "Shirt",
        "price": 500,
        "quantity": 10
    },
    {
        "_id": "2",
        "name": "Pant",
        "price": 1000,
        "quantity": 5
    },
    {
        "_id": "3",
        "name": "Shoe",
        "price": 1500,
        "quantity": 2
    }
];

module.exports = {
    addProduct: (req, res) => {
        try {
            console.log('API call', req.body);

            products.push(req.body);
            console.log('all product', products);

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Product added successfully",
                data: req.body
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: err.message
            })
        }
    },
    getProduct: (req, res) => {
        try {
            console.log('all product', products);
            res.status(200).json({
                success: true,
                statusCode: 200,
                count: products.length,
                message: "Product fetched successfully",
                data: products
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: err.message
            })
        }
    },
    updateProduct: (req, res) => {
        try {
            //console.log('API call', req.body);

            const productIndex = products.findIndex((product) => product._id === req.body._id);
            //console.log('productIndex', productIndex);
            if (productIndex === -1) {
                products[productIndex] = req.body.updatedData;
                //console.log('updated product', products[productIndex]);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "Product updated successfully",
                    data: products[productIndex]
                });
            } else {

                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: "Product not found"
                })
            
        }

        } catch(err) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: err.message
        })
    }
}
}