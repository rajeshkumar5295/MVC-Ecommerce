import React ,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout';
import axios from "axios";
import { useParams } from 'react-router-dom';




const ProductDetails = () => {  

       const params=useParams();

       console.log(params);
     const [products,setProducts]=useState({});

     const [relatedProducts,setRelatedProducts]=useState([]);
     

     console.log(products)
  

      const singleProduct=async()=>{   
         try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-singleproducts/${params.slug}`)
            console.log(data);
            setProducts(data?.singleproduct)

            getsimilarProducts(data?.singleproduct?._id,data?.singleproduct?.category?._id);
         } catch (error) {  
            console.log(error);
            
         }

     }    

     useEffect(()=>{
      if(params?.slug) singleProduct();
         },[params?.slug])
     console.log(products)
   
  

     const getsimilarProducts=async(pid,cid)=>{
           try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/products/related-products/${pid}/${cid}`);
              console.log(data);
              setRelatedProducts(data?.prodcuts);

           } catch (error) {     
            console.log(error);

            
           }

     }

   console.log(relatedProducts);    

  return (
    <Layout>
           <div className="row container mt-3 ">
               <div className="col-md-6"> 
               <img src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${products._id}`} className="card-img-top img-fluid  img-thumbnail"  style= {{width:"auto",height:"230px"}} alt={products.name} />
                </div>

               <div className="col-md-6 "> 

               {/* Cannot read properties of undefined (reading 'name')
                       TypeError: Cannot read properties of undefined (reading 'name') */}

                       {/* This error is soleved by giving ' ? '  . which mean if data is loaded successfully then show it */}

                   <h1 className='text-center' > Product Details </h1> 
                   <h6> Name:{products?.name} </h6>
                   <h6> Description:{products?.description} </h6>
                   <h6> Price:{products?.price} </h6>

                      {/* Also give '?  ' symbol in both place i.e. after products and after category */}
                   <h6> Category:{products?.category?.name} </h6>
                   <button className='btn btn-secondary  ms-1'  > ADD TO CART </button>
                    


               </div>
           </div>
             <hr />
           <div className="row container">  
                       <h3> Similar Products  </h3>  
                       { relatedProducts.length<1 && <p className='text-center fs-3 ' > No Similar Products found </p> }
                       <div className="mb-2 d-flex flex-row flex-wrap  ">
                                  {
                                      relatedProducts?.map((p)=>(
                                        <>  
                                           
                                  <>
                                         <div key={p._id}  className="card m-2 " style={{width: '18rem'}}>
                                            <img src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`} className="card-img-top img-fluid  img-thumbnail   "  style= {{width:"auto",height:"230px"}} alt={p.name} />
                                            <div className="card-body">
                                              <h5 className="card-title"> {p.name} </h5>
                                              <p className="card-text">  {p.description.substring(0,30)} </p>
                                              <p className="card-text"> $ {p.price} </p>
                                              {/* <p className="card-text">  {p.category} </p> */}


                                            
                                              <button className='btn btn-secondary  ms-2' > ADD TO CART  </button>
                                    
                                            </div>
                                          </div>
                                   </>


                                        </>
                                       ))
                                  }
                                                  </div>
           
            </div>
    </Layout>
  )
}

export default ProductDetails