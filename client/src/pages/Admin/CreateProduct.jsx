import React ,{useState,useEffect}  from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import {toast} from 'react-toastify';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

// To create drodown menu 
import {Select} from'antd';
const {Option} =Select;

const CreateProduct = () => {
            
       const [categories,setCategories]=useState([]);

       const [name,setName]=useState("");
       const[description,setDescription]=useState("");
       const [price,setPrice]=useState("");
       const[quantity,setQuantity]=useState("");
       const[shipping,setShipping]=useState("");
      const[photo,setPhoto]=useState("");
       const [category,setCategory]=useState("");

       
       //
      const navigate=useNavigate();

   // function to get all categories
     const getAllCategory=async()=>{
               try {   
                  const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
                console.log(data.category);
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
            
      console.log(categories);

         /// create product function
         const handleCreate=async(e)=>{
                  e.preventDefault();
                     try {      const productData=new FormData();
                      productData.append("name",name)
                      productData.append("description",description)
                      productData.append("price",price)
                      productData.append("quantity",quantity)
                      productData.append("photo",photo)
                      productData.append("category",category)

                      const {data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/products/create-products` ,productData )
                      console.log(data);
                      if(data?.success){
                        toast.success("product created successfully");
                        navigate("/dashboard/admin/products");
                      }else{
                        toast.error(data?.message);
                      }
                      
                     } catch (error) { 
                      console.log(error);
                      toast.error("Something went wrong in creating product")
                      
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
                                   <h1> Create Product    </h1>
                                   <div className="m-1 w-75 ">
                                       <Select 
                                        bordered={false}
                                        placeholder="Select Your category"
                                        size='large'
                                        showSearch
                                        className='form-select mb-3 '
                                        onChange={(value)=>{setCategory(value)}}
                                       
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
                                                 {photo && (
                                                    <div className=' text-center'>    
                                                      <img   
                                                        src={URL.createObjectURL(photo)}
                                                        alt='product photo'
                                                        height={"200px"}
                                                        className='img img-responsive'
                                                      />
                                                    
                                                     </div>
                                                 )}

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
                                                onChange={(value)=>{setShipping(value)} }
                                              >
                                                    <Option value="0" > No </Option>
                                                    <Option value="1" >Yes</Option>
                                             </Select>
                                            </div>
                                            
                                          <div className="mb-3">
                                             <button className='btn btn-secondary'   onClick={handleCreate}  >CREATE PRODUCT  </button>
                                          </div>
                                   </div>
                             </div>
                           
                  </div>
                    </div>      
          </Layout>

    </div>
  )
}

export default CreateProduct