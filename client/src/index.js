import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

import { AuthProvider } from './context/auth';
import { CartProvider } from './context/cart';

//  To use 'antd' we also have to import css library after installation of antd package 
import 'antd/dist/reset.css';
import { SearchProvider } from './context/search';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      
       <AuthProvider>
              <SearchProvider>
                 <CartProvider>
                 <BrowserRouter>
                   <App />
              </BrowserRouter>
                 </CartProvider>
        </SearchProvider>
       </AuthProvider>
);



