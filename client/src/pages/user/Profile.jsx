import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  //
  const navigate = useNavigate();
  //get user data from auth
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, { name, email, address, password, phone } );
      console.log(data);

      if(data?.error){
        toast.error(data?.error);

      }
      else{
        setAuth({...auth,user:data?.updatedUser});
        let ls=localStorage.getItem("auth");
        ls=JSON.parse(ls);
        ls.user=data.updatedUser;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success("Profile Updated Successfully");

      }


    
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Layout title={"Your Profile"}>
        <div className="container-fluid m-3 p-2">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>

            <div className="col-md-9">
              <div className=" form-container " style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                  <h1 className="title"> USER PROFILE </h1>
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
                     
                      disabled
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
                     
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    UPDATE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
