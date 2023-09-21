import express from 'express';
import {loginController, registerController,testController  ,forgotPasswordController,updateProfileController,getOrderController ,getAllOrdersController ,orderStatusController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


//  router object ( if we do routing in seprate file then we need router object )
const router=express.Router();

// Routing 

//  For Register 
router.post('/register', registerController)


// For Login


  router.post('/login',loginController)

  // Forgot Password || POST
  router.post("/forgot-password",forgotPasswordController)

 // test route for middleware protect
  router.get('/test' ,  requireSignIn ,isAdmin ,testController )

  // protected  User route-auth  (for dashboard) 
   router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
   })

    // protected   Admin route-auth   
    router.get("/admin-auth" ,requireSignIn,isAdmin , (req,res)=>{
      res.status(200).send({ok:true});
     })


     // update profile
     router.put("/profile",requireSignIn,updateProfileController);


//   getting for user order
    router.get('/orders',requireSignIn,getOrderController);

    //  all orders
    router.get("/all-orders" ,requireSignIn  ,isAdmin,getAllOrdersController);

    // order status update 
    router.put("/order-status/:orderId" ,requireSignIn,isAdmin,orderStatusController);



export default router