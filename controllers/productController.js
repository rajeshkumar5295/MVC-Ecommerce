import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/CategoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from 'fs';
import { constants } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();
// payment gateway 
  import braintree from "braintree";

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLICK_KEY,
  privateKey:process.env.BRAINTREE_PRIVATE_KEY,
});






export const createProductController=async(req,res)=>{
            try {
                   const {name,slug,description,price,category,quantity,shipping } =req.fields;
                    const {photo}=req.files;
                    //validation 
                   switch(true){
                    case !name:return res.status(500).send({error:'name is required'});
                    case !description:return res.status(500).send({error:'description is required'});
                    case !price:return res.status(500).send({error:'price is required'});
                    case !category:return res.status(500).send({error:'category is required'});
                    case !quantity:return res.status(500).send({error:'quantity is required'});
                      
                    case photo && photo.size>1000000: return res.status(500).send({error:'photo is required and should be less than 1mb'})    

                    }

                    const products=new productModel({...req.fields,slug:slugify(name)})
                    if(photo){
                        products.photo.data=fs.readFileSync(photo.path)
                        products.photo.contentType=photo.type
                    }
                      
                    await products.save();
                    res.status(201).send({
                        success:true,
                        message:"Product Created Successfully",
                        products
                    })


            } catch (error) {
                console.log(error)
                res.status(500).send({
                    success:false,
                    error,
                    message:"Error while creating product"
                })
                
            }
}

//controller for gettin prodcuts
 export const getProductController=async(req,res)=>{  
                      try {  

                      const products=await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
                      res.status(200).send({
                          success:true,
                          message:" All products",
                          total:products.length,
                          products,
                         
                      })
                                    
                      } catch (error) {
                          console.log(error);
                          res.status(500).send({
                            success:false,
                            message:"Error while getting the products",
                            error
                          })
                      }
                 
 }

 //  controller for  getting single product 
   export const getSingleProductController=async(req,res)=>{
                             try {   
                                   const singleproduct=await  productModel.findOne({slug:req.params.slug}).select("-photo").populate("category"); 
                                   res.status(200).send({
                                    success:true,
                                     message:"Single product fetched",
                                     singleproduct,
                                   })
                                     
                             } catch (error) {
                                  console.log(error)
                                  res.status(500).send({
                                     success:false,
                                     message:"Error while getting single product",
                                     error
                                  })
                             }
   }
   

   // controller for getting the photo 
    export const productPhotoController=async(req,res)=>{
         try {
                const product=await productModel.findById(req.params.pid).select("photo");
                if(product.photo.data){
                    res.set("Content-type",product.photo.contentType);
                    return res.status(200).send(product.photo.data)
                }
                      
         } catch (error) {
              console.log(error)
              res.status(500).send({
                 success:false,
                 message:'Error while getting the photo',
                 error
              })
         }
    }


   

    // controller  for updating the product

    export const updateProductController=async(req,res)=>{
           try {  
            const {name,slug,description,price,category,quantity,shipping } =req.fields;
            const {photo}=req.files;
            //validation 
           switch(true){
            case !name:return res.status(500).send({error:'name is required'});
            case !description:return res.status(500).send({error:'description is required'});
            case !price:return res.status(500).send({error:'price is required'});
            case !category:return res.status(500).send({error:'category is required'});
            case !quantity:return res.status(500).send({error:'quantity is required'});
              
            case photo && photo.size>1000000: return res.status(500).send({error:'photo is required and should be less than 1mb'})    

            }

            const products=await productModel.findByIdAndUpdate(req.params.pid,
                {  ...req.fields,slug:slugify(name)},{new:true}
                )
            if(photo){
                products.photo.data=fs.readFileSync(photo.path)
                products.photo.contentType=photo.type
            }
              
            await products.save();
            res.status(201).send({
                success:true,
                message:"Product Created Successfully",
                products
            })
                   
           } catch (error) {
                 console.log(error);
                 res.status(500).send({
                    success:false,
                    message:"Product updated successfully",
                    error 
                 })
           }
    }


     // controller for delelting the products
     export const deleteProductController=async(req,res)=>{
        try {  
               await productModel.findByIdAndDelete(req.params.pid).select("-photo");
               res.status(200).send({
                 success:true,
                 message:'product deleted successfully'
               })
         
        } catch (error) {
           console.log(error);
           res.status(500).send({
             success:false,
             message:"Error while deleting the product",
             error,
           })
        }
}

export const productFilterController = async(req,res)=>{ 
                try {   
                    const{checked,radio}=req.body;
                    let args={};
                    if(checked.length>0) args.category=checked;
                    if(radio.length) args.price={$gte:radio[0],$lte:radio[1]};
                    const products=await productModel.find(args) ;
                    res.status(200).send({
                        success:true,
                        products,
                    })  
                       
                    
                } catch (error) {   
                    console.log(error)
                    res.status(500).send({
                        success:false,
                        message:"Error while getting filter products",
                        error,
                    })
                    
                }

}


// controller for product count (for pagination)
export const productCountController=async(req,res)=>{
                     try {  
                        const total=await productModel.find({}).estimatedDocumentCount();
                        res.status(200).send({
                            success:true,
                            total,
                        })
                        
                     } catch (error) {
                               console.log(error)
                               res.status(400).send({
                                 message:"Error in product count",
                                 error,
                                 success:false,
                               });                        
                     }
}

  // productlist best on page
export const productListController=async(req,res)=>{ 
             try {  
                const perPage=9;
                const page=req.params.page?req.params.page:1;
                const products=await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
                res.status(200).send({
                   success:true,
                   products
                })
                
             } catch (error) {   
                console.log(error)
                res.status(400).send({
                    message:"error in per page ",
                    error,
                })

                
             }

}
  
//search product controller
export const  searchProductController=async(req,res)=>{ 

    try {        
        const {keyword}=req.params;
        const results=await productModel.find({
            $or:[
                {name:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }) .select("-photo");
        res.json(results);
             
      } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error during search in search  product  API" ,
            error,
                })
        
    }
}

// similar product controller
  
 export const relatedProductController=async(req,res)=>{
             try {    
                    const {cid,pid}=req.params;
                    const prodcuts=await productModel.find({
                         category:cid,
                         _id:{$ne:pid}
                    }).select("-photo").limit(3).populate("category") 

                    res.status(200).send({
                        success:true,
                        prodcuts
                    
                    })
                
             } catch (error) {
                    console.log(error); 
                     res.status(400).send({
                        success:false,
                        message:"Error while getting similar products",
                        error,
                     })

             }
 }

 // controller for getting product on basis of category
   
   export const productCategoryController=async(req,res)=>{ 
                        try {  
                                const category=await categoryModel.findOne({slug:req.params.slug});
                                const products=await productModel.find({category}).populate("category");
                                res.status(200).send({
                                    success:true,
                                    products,
                                    category,

                                });
                               
                        } catch (error) { 
                            console.log(error);
                            res.status(400).send({
                                success:false,
                                message:"Error while getting the products",
                                error,
                            })
                            
                        }
              
       
   }


   //payment gateway api
   // controller for token
   export const braintreeTokenController=async(req,res)=>{

      try {    
              gateway.clientToken.generate({},function(err,response){
                 if(err){
                    res.status(500).send(err)
                 }else{
                    res.send(response);
                 }
              })
        
      } catch (error) {
                   console.log(error);
                        
      }
   }

   // controller for payment
   export const brainTreePaymentController=async(req,res)=>{
      try {    
             const {cart,nonce}=req.body;

             let total=0;
             cart.map((i)=>{total+= i.price;});

             let newTransaction=gateway.transaction.sale(
                {
                  amount:total,
                  paymentMethodNonce:nonce,
                  options:{
                    submitForSettlement:true 
                  }
             } , 

                function (error ,result){
                    if(result){
                        const order=new orderModel({
                            products:cart,
                            payment:result,
                            buyer:req.user._id
                        }).save()
                        res.json({ok:true})
                    }else{
                        res.status(500).send(error)
                    }
                }
             )




               
            
        
      } catch (error) {  
        console.log(error)
                                       
      }
   }