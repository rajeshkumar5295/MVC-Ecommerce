import express from 'express';

import { isAdmin , requireSignIn} from '../middlewares/authMiddleware.js';
import { getcategoryController ,updateCategoryController, createCategoryController,singleCategoryController,deleteCategoryController} from '../controllers/categoryController.js';

const router=express.Router();


// Routing 
// creating category
router.post("/category-route", requireSignIn,isAdmin, createCategoryController);

// update category
router.put("/update-category/:id" ,requireSignIn,isAdmin,updateCategoryController);

// getting all category
router.get("/get-category",getcategoryController)

// getting single category
router.get("/single-category/:slug",singleCategoryController);

//delete category
router.delete("/delete-category/:id" ,  requireSignIn,isAdmin, deleteCategoryController);



export default router;