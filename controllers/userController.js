const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
   addUser: async (req, res) => {
      try {
         //console.log(req.body);
         const { name, username, email, password, age, gender } = req.body;
         console.log(name, username, email, password, age, gender);

         if (name && username && email && password && age && gender) {
            const encryptedPassword = await bcrypt.hash(password, 10);

            const newUser = new userModel({
               name,
               username,
               email,
               password: encryptedPassword,
               age,
               gender
            });
            newUser.save()
               .then((response) => {
                  console.log("response:", response);
                  return res.status(201).json({
                     success: true,
                     statusCode: 201,
                     message: "User added successfully",
                     data: response
                  });
               }).catch((error) => {
                  console.log("error:", error);
                  if (error.code === 11000) {
                     return res.status(400).json({
                        success: false,
                        statusCode: 400,
                        message: "User with same username already exists!"
                     });
                  }
                  return res.status(400).json({
                     success: false,
                     statusCode: 400,
                     message: error.message
                  });
               })
         } else {
            res.status(400).json({
               success: false,
               statusCode: 400,
               message: " missing required fields"
            });
         }
      } catch (error) {
         res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message
         });
      }


   },
   getUser: async (req, res) => {
      try {
         console.log(req);
         // const users = await userModel.aggregate([
         //    [
         //       {
         //         '$match': {
         //           'isDeleted': false
         //         }
         //       }, {
         //         '$lookup': {
         //           'from': 'products', 
         //           'localField': 'cart.productId', 
         //           'foreignField': '_id', 
         //           'as': 'products'
         //         }
         //       }, {
         //         '$sort': {
         //           'gender': 1
         //         }
         //       }
         //     ]
         // ]);
         // const users = await userModel
         //    .find({ isDeleted: false }).populate('cart').lean();

         const users = await userModel
            .find({ isDeleted: false }).populate('cart.productId').lean();

         console.log("Printing users")
         console.log(users);

         return res.status(200).json({
            success: true,
            statusCode: 200,
            count: users.length,
            message: "Users retrieved successfully",
            data: users
         });
      } catch (error) {
         console.log("error: ", error);
         res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error"
         });

      }
   },
   addProductToUserCart: (req, res) => {
      try {
         // console.log(req.body);
         const { userId, product } = req.body;
         //console.log(userId, product);
         console.log(userId);
         const { productId, quantity } = product;

         console.log(productId, quantity);

         if (userId && productId && quantity) {
            userModel.updateOne(
               { _id: userId },
               {
                  $push: { cart: product }
               }
            ).then((response) => {
               console.log(response);
               if (response?.modifiedCount !== 0) {
                  return res.status(200).json({
                     success: true,
                     statusCode: 200,
                     message: "Product added to cart successfully",
                     data: response
                  });
               }
               else {
                  return res.status(400).json({
                     success: false,
                     statusCode: 400,
                     message: "Product not added to cart"
                  });
               }
            }
            ).catch((error) => {
               console.log("error:", error);
               if (error.code === 11000) {
                  return res.status(400).json({
                     success: false,
                     statusCode: 400,
                     message: "Product with same category already exists!"
                  });
               }
               return res.status(400).json({
                  success: false,
                  statusCode: 400,
                  message: error.message
               });
            })

         } else {
            return res.status(400).json({
               success: false,
               statusCode: 400,
               message: " missing required fields"
            });
         }
      } catch (error) {
         res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message
         });
      }
   },
   userLogin: async (req, res) => {
      try {
         const { email, password } = req.body;
         if (email && password) {
            const userFound = await userModel.findOne({ email: email }).lean();

            if (userFound) {
               const ispasswordMatch =  await bcrypt.compare(password, userFound.password);
               console.log(ispasswordMatch);

               if (ispasswordMatch) {
                  delete userFound.password;

                  const jwtSecretKey = process.env.JWT_SECRET_KEY;
                  const token = jwt.sign(
                     { userId: userFound?._id },
                     jwtSecretKey,
                     { expiresIn: "5d" }
                  )

                  return res.status(200).json({
                     success: true,
                     statusCode: 200,
                     message: "User login successfully",
                     token: token,
                     data: userFound
                  })
               } else {
                  res.status(200).json({
                     success: false,
                     statusCode: 200,
                     message: "Incorrect password"
                  })
               }
            } else {
               res.status(200).json({
                  success: false,
                  statusCode: 200,
                  message: " User doesnot exists"
               })
            }
         } else {
            res.status(200).json({
               success: false,
               statusCode: 200,
               message: "Missing required fields"
            })
         }
      } catch (error) {
         console.log("error is:", error);
         res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message
         });
      }
   }

}