import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";

  

// controller for creating category
export const createCategoryController=async(req,res)=>{
                   
     try {    
            const {name}=req.body;
            if(!name){
                return res.status(401).send({message:"name is required"});
            }   
            const existingCategory=await CategoryModel.findOne({name});
            if(existingCategory){
                return res.status(200).send({
                    success:true,
                    message:"Category already exists",

                })
            }
       const category=await new CategoryModel({name,slug:slugify(name)}).save();
          res.status(201).send({
            success:true,
            message:'New category created successfully',
            category
          })
        
     } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Category",
            error
        })
        
     }         
}

// controller for updatating category

  export  const updateCategoryController= async (req,res)=>{
    try {  
        const {name}=req.body;
        const {id}=req.params
        const category=await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
             success:true,
             message:"Category updated successfully",
             category,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Can't update category",
            error,
        })
        
    }
                             
  }


  // controller to get all category
   export const getcategoryController=async(req,res)=>{
      
            try {  
                   const category=await CategoryModel.find({})
                   res.status(200).send({
                      success:true,
                      message:"All Categories List",
                      category,

                   })
                
            } catch (error) {
                console.log(error)
                res.status(500).send({
                    success:false,
                    error,
                    message:"Error while getting all category",
                })
            }

   }


   // controller to get single categroy
    export const singleCategoryController=async(req,res)=>{
                try {   
                       const singlecategory=await CategoryModel.findOne({slug:req.params.slug})
                       res.status(200).send({
                         success:true,
                         message:"successfully got a single category",
                         singlecategory,
                       })
                    
                } catch (error) {
                    console.log(error)
                    res.status(500).send({
                        success:false,
                        error,
                        message:"Can't a single category",
                    })
                    
                }
    }

    // controller for delet the category
     export const deleteCategoryController=async(req,res)=>{
                            try {
                                   const {id}=req.params;
                                   await CategoryModel.findByIdAndDelete(id);
                                   res.status(200).send({
                                    success:true,
                                    message:"Deleted sucessfully",
                                
                                   })

                            } catch (error) {
                                 console.log(error)
                                 res.status(500).send({
                                    success:false,
                                    message:"Error while deleting category",
                                    error ,
                                 })
                            }
     }