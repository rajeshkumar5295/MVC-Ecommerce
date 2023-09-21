// const express=require("express");

import express from "express";
import morgan from "morgan";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cors from "cors"

import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js";

//rest obj
const app=express();

// configure env
dotenv.config();

//  database congig
connectDB();

//middelwares
app.use(express.json());
app.use(morgan('dev')); 
app.use(cors());

// const PORT=8080;
const port=process.env.PORT||8080;
console.log(port);




// all routes  
   app.use("/api/v1/auth" , authRoutes)
   app.use("/api/v1/category",  categoryRoutes )
   app.use("/api/v1/products",productRoutes)





app.get("/",(req,res)=>{
        res.send(
            {
                message:"Welcome to my new project"
            }
        )
      
})

app.listen(port,()=>{
     console.log(`Server is runnign on port ${port} `  );
})