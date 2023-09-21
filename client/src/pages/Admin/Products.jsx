import React ,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import {toast} from 'react-toastify'

import { Link } from 'react-router-dom'

const Products = () => {

        // const [product,setProduct]=useState({});  ,,  Because of this error --->   product.map() is not a function  . as i have set object  {} . and we should map a array
          const [product,setProduct]=useState([])
        
        const getAllproducts=async()=>{
              try{
                const res=await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-products`);

                // console.log(res);
                // console.log(res.data)
                // console.log(res.data.message)
                // console.log(res.data.products)
                    
                setProduct(res.data.products)

              }catch(error){
                console.log(error);
                toast.error("Error while getting products");
              }
        }
        useEffect(()=>{
            getAllproducts();
        },[])
           
   console.log(product)

  return (
    <div>
         <Layout>
              {/* <div className='container-fluid bg-primary-subtle h-100 w-100 ' >   */}
              <div className="row">
                         <div className="col-md-3">
                              <AdminMenu/>
                         </div>


                         <div className="col-md-9">
                            <h1 className='text-center fs-2' >  All Product List </h1>
                             
                             <div className="mb-2  d-flex flex-row flex-wrap   ">
                                  {
                                       product?.map((p)=>(
                                        <>  
                                           
                                <Link  
                                key={p._id}
                                 to={`/dashboard/admin/products/${p.slug}`}
                                 className='product-link'
                                    
                                >
                                <div   className="card m-2 " style={{width: '18rem'}}>
                                   <img src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`} className="card-img-top img-fluid  img-thumbnail   "  style={{width:"auto",height:"230px"}} alt={p.name} />
                                   <div className="card-body">
                                     <h5 className="card-title"> {p.name} </h5>
                                     <p className="card-text">  {p.description} </p>
                                    
                                   </div>
                                 </div>
                                </Link>


                                        </>
                                       ))
                                  }
                             </div>

                         </div>
                   
              </div>
                
              {/* </div> */}
         </Layout>
    </div>
  )
}

export default Products