import React ,{useState,useEffect}  from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import {toast} from 'react-toastify';
import axios from 'axios';

import { useNavigate,useParams } from 'react-router-dom';

// To create drodown menu 
import {Select} from'antd';
const {Option} =Select;

const UpdateProduct = () => {
            
    const [categories,setCategories]=useState([]);

    const [name,setName]=useState("");
    const[description,setDescription]=useState("");
    const [price,setPrice]=useState("");
    const[quantity,setQuantity]=useState("");
    const[shipping,setShipping]=useState("");
     const[photo,setPhoto]=useState("");
    const [category,setCategory]=useState("");

    const[id ,setId]=useState("");

    
    //
   const navigate=useNavigate();
   const params=useParams();
     
   // function for single product
    const getSingleProduct=async()=>{
        try {
               const res=await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-products/${params.slug}`);
              //  console.log(res)
              //  console.log(res.data);
               console.log(res.data.singleproduct);
               setName(res.data.singleproduct.name)
               setId(res.data.singleproduct._id)
               setDescription(res.data.singleproduct.description)
               setPrice(res.data.singleproduct.price)
               setQuantity(res.data.singleproduct.quantity)
               setShipping(res.data.singleproduct.shipping)
               setCategory(res.data.singleproduct.category._id);
                
        } catch (error) {
            
            console.log(error)
        }
    }

       useEffect(()=>{
                 getSingleProduct();
                 // eslint-disable-next-line

       },[])
// function to get all categories
  const getAllCategory=async()=>{
            try {   
               const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            //  console.log(data.category);
             if(data?.success){
                setCategories(data?.category);
             }
             
            } catch (error) {
             toast.error("Something went wrong in gettin category");
            }
  }
   useEffect(()=>{
         getAllCategory();
         
   },[])
         
//    console.log(categories);

      /// Update product function
      const handleUpdate=async(e)=>{
               e.preventDefault();
                  try {     
                    const productData=new FormData();
                   productData.append("name",name)
                   productData.append("description",description)
                   productData.append("price",price)
                   productData.append("quantity",quantity)

                photo && productData.append("photo",photo)

                   productData.append("category",category)

                   const {data}= await axios.put(`${process.env.REACT_APP_API}/api/v1/products/update-product/${id}` ,productData )
                //    console.log(data);
                   if(data?.success){
                     toast.success("product Updated successfully");
                     navigate("/dashboard/admin/products");
                   }else{
                     toast.error(data?.message);
                   }
                   
                  } catch (error) { 
                //    console.log(error);
                   toast.error("Something went wrong in creating product")
                   
                  }
      } 



//  function for deleting the product
    const handleDelete=async()=>{  
      try {         
           let answer=window.prompt("Are You Sure want to delete this product ?");
           if(!answer) return;  
                  
        const {data} =await axios.delete(`${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`)
        toast.success("product deleted successflly");
        navigate("/dashboard/admin/products");
        
      } catch (error) {  
        console.log(error)
        toast.error("Something went wrong")
      }
      
    }

       
  return (
    <div>   
             <Layout title={"Dashboard-All Products"} >
                 <div className='container-fluid m-3 p-2' >  
                          
          <div className="row">
                           <div className="col-md-3"> 
                               <AdminMenu/>
                           </div>
                             <div className="col-md-9   ">
                                   <h1> Update Product    </h1>
                                   <div className="m-1 w-75 ">
                                       <Select 
                                        bordered={false}
                                        placeholder="Select Your category"
                                        size='large'
                                        showSearch
                                        className='form-select mb-3 '
                                        onChange={(value)=>{setCategory(value)}}
                                        value={category}
                                       
                                       >  
                                       {
                                        categories.map((c)=>(
                                          <>  
                                          <Option  key={c._id} value={c._id} >   
                                               {c.name}
                                          </Option>
                                          </>
                                        ))
                                       }
                                          
                                       </Select>

                                             <div className="mb-3">
                                               <label className='btn btn-outline-secondary col-md-12 '   >
                                                {photo?photo.name:"Upload Photo"}
                                                <input type="file"
                                                name="photo"
                                                accept='image/*'
                                                onChange={(e)=>setPhoto(e.target.files[0])}
                                                hidden
                                                
                                                />
                                               </label>
                                             </div>

                                             <div className="mb-3"> 
                                                 { photo ?(
                                                    <div className=' text-center'>    
                                                      <img   
                                                        src={URL.createObjectURL(photo)}
                                                        alt='product photo'
                                                        height={"200px"}
                                                        className='img img-responsive'
                                                      />
                                                    
                                                     </div>
                                                 ) :
                                                 (        <div className=' text-center'>    
                                                 <img   
                                                   src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${id}`}
                                                   alt='product photo'
                                                   height={"200px"}
                                                   className='img img-responsive'
                                                 />
                                               
                                                </div>

                                                 )
                                                 }

                                             </div>

                                             <div className="mb-3">
                                                <input type="text" 
                                                    value={name}
                                                    placeholder='write a name'
                                                    className='form-control'
                                                    onChange={(e)=>setName(e.target.value)}

                                                />
                                             </div>
                                             <div className="mb-3">
                                                <textarea type="text" 
                                                    value={description}
                                                    placeholder='write a description'
                                                    className='form-control  '
                                                    onChange={(e)=>setDescription(e.target.value)}

                                                />
                                             </div>
                                             <div className="mb-3">
                                                <input type="number" 
                                                    value={price}
                                                    placeholder='write a Price'
                                                    className='form-control'
                                                    onChange={(e)=>setPrice(e.target.value)}

                                                />
                                             </div>
                                             <div className="mb-3">
                                                <input type="number" 
                                                    value={quantity}
                                                    placeholder='write a quantity'
                                                    className='form-control'
                                                    onChange={(e)=>setQuantity(e.target.value)}

                                                />
                                             </div>

                                            <div className="mb-3">
                                            <Select 
                                              placeholder="Select Shipping" 
                                                bordered={false}
                                                size='large'
                                                showSearch
                                                className='form-select mb-3'
                                                onChange={(value)=>{setShipping(value)}}      
                                                value={shipping?"Yes":"No"}
                                              >
                                                    <Option value="0" > No </Option>
                                                    <Option value="1" >Yes</Option>
                                             </Select>
                                            </div>
                                            
                                          <div className="mb-3">
                                             <button className='btn btn-secondary'   onClick={handleUpdate}  >UPDATE PRODUCT  </button>
                                          </div>
                                          <div className="mb-3">
                                             <button className='btn btn-danger'   onClick={handleDelete}  >DELETE PRODUCT  </button>
                                          </div>
                                   </div>
                             </div>
                           
                  </div>
                    </div>      
          </Layout>
                
        
           
    </div>
  )
}

export default UpdateProduct