import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/AuthStyles.css";

import { useAuth } from "../../context/auth";

import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate=useNavigate();
        
   const [auth,setAuth]=useAuth();

   const location =useLocation();

  const handleSubmit=async(e)=>{
              e.preventDefault();  
              
              try {
                    const res= await  axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login` ,{email,password} ) 
                      
                    console.log(res);
                      
                     if(res.data.success){
                      toast.success(res.data.message);

                         setAuth({
                          ...auth,
                          user:res.data.user,
                          token:res.data.token
                         }) 
                         localStorage.setItem('auth' ,JSON.stringify(res.data));
                        
                      navigate( location.state ||  "/");

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
            <h1 className="title"> Login Here </h1>

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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

             <div  className="mb-3 mt-2   "> 
              
               < div
                  onClick={()=>{navigate("/forgot-password")}}
                  type="button" 
               className="  ">

              Forgot Password ?
            </div>
                  
             </div>
    
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
