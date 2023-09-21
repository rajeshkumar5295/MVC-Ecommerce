import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/AuthStyles.css";




const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer,setAnswer]=useState("");
  
  const navigate=useNavigate();
        
   

  

  const handleSubmit=async(e)=>{
              e.preventDefault();  
              
              try {
                    const res= await  axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password` ,{email,newPassword,answer} ) 
                      
                    console.log(res);
                      
                     if(res.data.success){
                      toast.success(res.data.message);
                        navigate( "/login");

                     }else{
                      toast.error(res.data.message);
                     }
                     
                       
              } catch (error) {
                  
                console.log(error)
                toast.error("Something went wrong")
                
              }
  }
     
  return (
    <div>
        <Layout>  
            
        <div className=" form-container " style={{ minHeight: "90vh" }}>
          <form onSubmit={handleSubmit}>
            <h1 className="title"> Reset Your Password </h1>

            <div className="mb-3">
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your Email"
                required
              />
            </div>

            <div className="mb-3">
              <input
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your New password"
                required
              />
            </div>
                
            <div className="mb-3">
              <input
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your friend name"
                required
              />
            </div>


            <button type="submit" className="btn btn-primary">
              Reset
            </button>

    
          </form>
        </div>
      </Layout>
    </div>


      
    
  )
}

export default ForgotPassword