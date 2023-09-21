import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "../styles/CategoryProductStyle.css";

const CategoryProduct = () => {

         const [products,setProducts]=useState([]);
         const[category,setCategory]=useState([]);

         const params =useParams();
         const navigate=useNavigate();
      
   const getSingleCategory=async()=>{
            try {  
              const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-ctegory/${params.slug}`);
              console.log(data);
              setProducts(data?.products);
              setCategory(data?.category);
              
              
            } catch (error) {   
              console.log(error);
              
            }
   }   

     useEffect(()=>{
         if(params?.slug) getSingleCategory();
      },[params?.slug])
      console.log(category);
      console.log(products)
     
  return (
    <Layout>  
                 <div className="container-fluid  mt-3  category  ">
                          
                  <h1  className='text-center' > Category name: { category?.name} </h1>
                  <h2  className='text-center' >{products?.length} Result found </h2>

                  <div className="row">
                  <div className="col-md-12">
                                             {/* {JSON.stringify(radio,null,4)} */}
                                                      
                                                
                                      <div className="mb-2 d-flex flex-row flex-wrap ">
                                  {
                                       products?.map((p)=>(
                                        <>  
                                           
                                  <>
                                         <div key={p._id}  className="card m-2 " style={{width: '18rem'}}>
                                            <img src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`} className="card-img-top img-fluid  img-thumbnail   "  style= {{width:"auto",height:"230px"}} alt={p.name} />
                                            <div className="card-body">
                                              <h5 className="card-title card-name-price  "> {p.name} </h5>
                                              <p className="card-text">  {p.description.substring(0,30)} </p>
                                              <p className="card-text price "> Rs {p.price} </p>
                                              {/* <p className="card-text">  {p.category} </p> */}
                                              
                                               <div  className='d-flex'  >
                                               <button 
                                               className='btn btn-info'  
                                                onClick={()=>navigate(`/product/${p.slug}`)}      
                                              > More Details  </button>
                                              <button className='btn btn-secondary  ms-2' > ADD TO CART  </button>
                                               </div>
                                           
                                    
                                            </div>
                                          </div>
                                   </>


                                        </>
                                       ))
                                  }
                                                  </div>

                                                  {/* <div className='m-2 p-3' >  
                                                  
                                                    {products && products.length<total &&(
                                                      <button className='btn btn-warning' 
                                                        onClick={(e)=>{ 
                                                          e.preventDefault()
                                                          setPage(page+1);
                                                      }} >    
                                                        { loading?"Loading...":"Loadmore" }
                                                      </button>
                                                    )}
                                                          
                                                      </div> */}

                                                   
                                          </div>
                  </div>
         
                          
                 </div>
    </Layout>
  )
}

export default CategoryProduct