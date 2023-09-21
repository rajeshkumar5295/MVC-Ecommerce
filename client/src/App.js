import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound"
import Register from "./pages/Auth/Register";

// tostifiy setup in root  then by toast we can use it every where
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRout from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRout from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";




function App() {
  return (
                  
                 
             
              <>      
                     
                    <Routes>
                           <Route  path="/" element={<HomePage/>} />  

                               <Route  path="/product/:slug" element={<ProductDetails/>} />
                               <Route  path="/category/:slug" element={<CategoryProduct/>}    />
                               <Route  path="/card"  element={<CartPage/>} />
                               <Route path="/categories" element={<Categories/>}     />
                           <Route path="/search" element={<Search/>}    />

                           <Route  path="/dashboard" element={<PrivateRout/>} >
                                  <Route path="user" element={<Dashboard/>}  />
                                  <Route path="user/orders" element={<Order/>}  />
                                  <Route   path="user/profile" element={<Profile/>} />
                              
                           </Route>
                             
                             <Route path="/dashboard"  element={<AdminRout/>}   >
                                  <Route path="admin"  element={<AdminDashboard/>} />
                                  <Route   path="admin/create-category" element={<CreateCategory/>}  />
                                  <Route   path="admin/create-product" element={<CreateProduct/>}  />
                                   <Route  path="admin/users" element={<Users/>}  /> 
                                   <Route  path="admin/orders"  element={<AdminOrders/>}  />
     
                                   <Route path="admin/products" element={<Products/>}   />
                                   <Route   path="admin/products/:slug" element={<UpdateProduct/>}               />
                             </Route>


                           {/* <Route  path="/dashboard" element={<Dashboard/>}  /> */}

                           <Route  path="/about" element={<About/>} />
                           <Route  path="/contact" element={<Contact/>} />
                           <Route  path="/policy" element={<Policy/>} />
                             

                            <Route  path="/register" element={<Register/>}  />
                            <Route  path="/login" element={<Login/>}  />
                            <Route  path="/forgot-password" element={<ForgotPassword />} />

                           <Route  path="/*" element={<PageNotFound />} />
                          

                           
                    </Routes>
                    
                    <ToastContainer />
              </>

              
    
  );
}

export default App;
