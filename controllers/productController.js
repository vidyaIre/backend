const { response } = require('express');
const ProductModel = require('../models/productModel');
module.exports = {
    addProduct: (req, res) => {
        try {
            const { name, price, size, quantity } = req.body;
            //console.log(name, price, size);

            if (name && price && size && quantity) {
                const newProduct = new ProductModel({
                    name,
                    price,
                    size,            
                    quantity
                });
                newProduct.save()
                    .then((response) => {
                        console.log("response:", response);
                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "Product added successfully",
                            data: response
                        });
                    }).catch((error) => {
                        console.log("error:", error);
                        if (error.code === 11000) {
                            return res.status(400).json({
                                success: false,
                                statusCode: 400,
                                message: "Product with same category already exists!"
                            });
                        }

                        else {
                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "Product adding failed"
                            });

                        }
                    })
            } else {
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
    getProduct: async (req, res) => {
        try {
            const product = await ProductModel.find({ isDeleted: false });

            return res.status(200).json({
                success: true,
                statusCode: 200,
                count: product.length,
                message: "Product fetched successfully",
                data: product
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: error.message
            })

        }
    },
    updateProduct: (req, res) => {
        try {
            const { productId, updatedData } = req.body;
            if (productId) {
                ProductModel.updateOne(
                    { _id: productId },
                    updatedData
                ).then((response) => {
                    console.log("responce is:", response);
                    return res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: "product updeted successfully......",
                        data: response.message
                    });
                }).catch((error) => {
                    console.log("error is:", error);
                    return res.status(200).json({
                        success: false,
                        statusCode: 400,
                        message: "Product updating failed!!",
                        data: error.message
                    });
                })

            } else {
                res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: " missing required fields"
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
    deleteProduct: (req, res) => {
        try {
            const { productId } = req.body;
            
            if (productId) {
                ProductModel.updateOne(
                    { _id: productId },
                    updatedData
                ).then((response) => {
                    console.log("responce is:", response);
                    return res.status(200).json({
                        success: true,
                        statusCode: 200,
                        message: "product deleted successfully......",
                        data: response.message
                    });
                }).catch((error) => {
                    console.log("error is:", error);
                    return res.status(200).json({
                        success: false,
                        statusCode: 400,
                        message: "Product delete failed!!",
                        data: error.message
                    });
                })

            } else {
                res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: " missing required fields"
                })
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: error.message
            })

        }
    }
}