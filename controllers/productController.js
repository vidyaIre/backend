const ProductModel = require('../models/productModel');
module.exports = {
    addProduct: (req, res) => {
        try {
            const { name, price, size } = req.body;
            //console.log(name, price, size);

            if (name && price && size) {
                const newProduct = new ProductModel({
                    name,
                    price,
                    size
                });
                newProduct.save()
                    .then((response) => {
                        console.log("response:",response);
                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "Product added successfully",
                            data: response
                        });
                    }).catch((error) => {
                        return res.status(400).json({
                            success: false,
                            statusCode: 400,
                            message: error.message
                        });
                    })
            }else{
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "missing required fields"
                })
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: error.message
            })
        }
    },
    getProduct: async(req, res) =>{
        try{
            const product = await ProductModel.find({isDeleted: false});

            return res.status(200).json({
                success: true,
                statusCode: 200,
                count: product.length,
                message: "Product fetched successfully",
                data: product
            })

        }catch(error){
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: error.message
            })

        }
    }
}