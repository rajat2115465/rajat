require("dotenv").config();
const express =require("express");
const app=express();
// const mongoose =require("mongoose");
require("./db/Conn");
const Cook=require("cookie-parser");
const Products=require("./models/ProductsSchema");
const DefaultData=require("./defaultdata");
const cors=require("cors");
const router=require("./routes/router");
app.use(express.json());
app.use(Cook(""));
// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(router);
const port=process.env.port || 8005;
app.listen(port,()=>{
    console.log(`server is running on port number ${port}`);
});


DefaultData();
