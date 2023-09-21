import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import '../../styles/AuthStyles.css';

import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer,setAnswer]=useState("");

  const navigate = useNavigate();

  //   console.log(process.env.REACT_APP_API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, address, password, phone,answer }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Layout title={"Register-Ecommere App"}>

        <div className=" form-container " style={{minHeight:"90vh"}} >

           <form onSubmit={handleSubmit}>
            <h1 className="title" > Register here </h1>
            <div className="mb-3">
              {/* <label htmlFor="name" className="form-label">Name</label> */}
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="form-control"
                id="exampleInputname"
                placeholder="Enter your Name"
                required
              />
            </div>
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
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                type="text"
                className="form-control"
                id="exampleInputaddress"
                placeholder="Enter your address"
                required
              />
            </div>
            <div className="mb-3">
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="number"
                className="form-control"
                id="exampleInputphone"
                placeholder="Enter your Phone No."
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
            
              <div className="mb-3">
              <input
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                type="text"
                className="form-control"
                id="exampleInputanswer"
                placeholder="who is you best friend ?"
                required
              />
            </div>


            <button type="submit" className="btn btn-primary">
              Submit
            </button>
           </form>

        </div>

      </Layout>
    </div>
  );
};

export default Register;
