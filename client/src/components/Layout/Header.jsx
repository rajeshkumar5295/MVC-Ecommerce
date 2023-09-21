import React from 'react';
import { Link ,NavLink} from "react-router-dom"
  
import { useAuth } from '../../context/auth';
import {toast } from "react-toastify";
import SearchInput from '../Form/SearchInput';

// our coustom hooks
import useCategory from '../../hooks/useCategory';


// coustom hook
import { useCart } from '../../context/cart';


import {Badge} from "antd"


const Header = () => {
      
  const [cart,setCart ]=useCart();
         const [auth,setAuth]=useAuth(); 

         // extrating  from custom hooks
         const categories =useCategory();

          console.log(categories)

        const handleLogout=()=>{
                        
          setAuth({
            ...auth,
            user:null,
            token:"",
          });
          // setCart(null)
          // localStorage.removeItem("auth");
          localStorage.removeItem("cart");
          toast.success("Logout successfully")
        }

    
  return (
       <div>
   <nav className="navbar navbar-expand-lg   border border-dark-subtle border-2   bg-light    position-fixed  z-3   w-100 ">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

      <Link to="/"  className="navbar-brand" >Ecommerce App</Link>


           


      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

          {/* search box */} 
          <div className='' >    
                       <SearchInput/>    
            </div>
        <li className="nav-item">
          <NavLink to="/"  className="nav-link " >Home</NavLink>
        </li>

       <li className="nav-item dropdown">
         <Link  to="/categories"   className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Categories
         </Link>  
         <ul className="dropdown-menu">
            
            <li>
                <Link className='dropdown-item' to={`/categories`}  >
                    All Categories
                   </Link>
            </li>
                 
            {categories?.map((c)=>(
             
              <Link  to={`/category/${c.slug}`} className=" dropdown-item"  >  {c.name} </Link>
            ))}  
              </ul> 
</li>


             {
                  !auth.user?(
                   <>  
                       <li className="nav-item">
                   <NavLink to="/register" className="nav-link" >SignUp</NavLink >
                   </li>

                    <li className="nav-item">
                       <NavLink to="/login" className="nav-link" >Login</NavLink >
                   </li>
                   </> 
                   ):( 
                   <> 
             <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle"  role="button"  data-bs-toggle="dropdown" aria-expanded="false">
                  { auth?.user?.name }
                  </Link>
                <ul className="dropdown-menu">

                  <div className="nav-item">
                    <Link to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`}  className='nav-link'  >Dashboard </Link>
                  </div>

                  <div className="nav-item">
                    <Link onClick={handleLogout} to="/"  className="nav-link">Logout</Link>
                  </div>
                </ul>
         </li>


                
                    </> )
             }
            
             <li className="nav-item">
              
                <Badge count={cart?.length} showZero>
                <NavLink to="/card" className="nav-link" >Cart Item </NavLink >
               </Badge>
                    
               
             </li> 

               {/* <li className="nav-item">
                <NavLink to="/cart" className="nav-link   ">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li> */}




      </ul>


      
    </div>
  </div>
</nav>


      </div>
  )

}

export default Header