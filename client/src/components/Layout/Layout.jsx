import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";

const Layout = ({children  ,title,description,keywords,author}) => {
  return (
    <div>
           
           <Helmet>
                <meta charSet="utf-8" />
               
                  <meta name="description" content={description} />
                  <meta name="keywords" content={keywords} />
                  <meta name="author" content={author} />
            
          
                <title> { title } </title>
                
            </Helmet>  
                         
         <Header    />
         {/* <hr  className='' /> */}

        <main  style={{minHeight:'75vh'  ,top:"60px"}}  className='position-relative '    >  {children}  </main>
        
        {/* <div className=' text-center h-[80vh] '  >  {children}  </div> */}

         {/* <Footer/> */}
    </div>
  )
}

Layout.defaultProps={
      title:"Ecommerce app (Shope here)",
      description:"mern stack project",
      keywords:"mern react,node, mongodb",
      author:"Rajesh@Malllu"
}


export default Layout