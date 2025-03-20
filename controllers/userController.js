const userModel = require('../models/userModel');

module.exports = {
   addUser: (req, res) => {
      try {
         //console.log(req.body);
         const { name, username, email, age, gender } = req.body;
         console.log(name, username, email, age, gender);

         if (name && username && email && age && gender) {
            const newUser = new userModel({
               name,
               username,
               email,
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
         const user = await userModel.aggregate([
            {
               $match: {
                  age: { $gte: 18 }
               }
            },
            {
               $sort: {
                  gender: 1
               }
            },
            { $limit: 3 }

            // [
            //    {
            //      '$match': {
            //        'age': {
            //          '$gte': 18
            //        }
            //      }
            //    }, {
            //      '$sort': {
            //        'gender': 1
            //      }
            //    }, {
            //      '$match': {
            //        'gender': 'Male'
            //      }
            //    }, {
            //      '$limit': 2
            //    }
            //  ]
         ]);
         //console.log(user);
         return res.status(200).json({
            success: true,
            statusCode: 200,
            count: user.length,
            message: "Users retrieved successfully",
            data: user
         });
      } catch (error) {
         //console.log("error: ", error);
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
   }

}