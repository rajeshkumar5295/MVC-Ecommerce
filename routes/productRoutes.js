import express from "express";

import { isAdmin,requireSignIn } from "../middlewares/authMiddleware.js";

import { createProductController,getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController,productFilterController,productCountController,productListController,searchProductController,relatedProductController,productCategoryController,braintreeTokenController,brainTreePaymentController } from "../controllers/productController.js";
import formidable from 'express-formidable';


//creating products
const router=express.Router();
router.post("/create-products",  requireSignIn, isAdmin, formidable(), createProductController);

//  getting the products
 router.get("/get-products",getProductController);

// getting single products 
 router.get("/get-singleproducts/:slug" , getSingleProductController); 

 //getting the photo
 router.get("/product-photo/:pid" ,productPhotoController);

 

  // update product
  router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController);

  //deleting product 
  router.delete("/delete-product/:pid",deleteProductController);


  // filter  product
   router.post('/product-filters',productFilterController);

   // Route for pagination

   router.get('/product-count',productCountController);

   //product per page
   router.get('/product-list/:page' ,productListController);

   // search base  product
   router.get('/search/:keyword',searchProductController);


   //similar products
   router.get('/related-products/:pid/:cid',relatedProductController);

   // category wise product
   router.get('/product-ctegory/:slug',productCategoryController);

   // for payment gateway
   //token (from braintree)
   router.get('/braintree/token',braintreeTokenController);

   // payment
   router.post('/braintree/payment',requireSignIn,brainTreePaymentController);


export default router;