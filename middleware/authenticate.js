const jwt=require("jsonwebtoken");
const USER=require("../models/userSchema");
// const { compareSync } = require("bcryptjs");
const secretkey=process.env.KEY;
// const { router, tokenn } = require('../routes/router');

const authenticate=async(req,res,next)=>{
    try{
        // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUyMjQwNTU3YTFjYTdkNzI1MmMyOTgiLCJpYXQiOjE3MTAwMDg4OTl9.JINuVUnPmZwxLTs0gmbfRp5KGhQVflIiORIhbPvLs2U";
        //  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVkNTBlMDlmZTA5YmMzZjJmMzYxZjMiLCJpYXQiOjE3MTAwNTE1Nzh9.TZJdEYUTELjzMlQQiZyDsB3lhp4z10awLFhJEJ_8RnY";
         const token= res.Cookies.raja; //me
         console.log(token);
         const verifytoken=jwt.verify(token,secretkey);
         console.log(verifytoken);
         const rootuser=await USER.findOne({_id:verifytoken._id,"tokens.token":token});
         console.log(rootuser+" rooottttusesserr");
         if(!rootuser){
            throw new Error("user not found"); 
        }
        req.userID=rootuser._id
        req.token=token
        req.rootuser=rootuser
        next();
    }catch(error){
        res.status(401).send("unautherized ");
        console.log(error);
    }
}
module.exports=authenticate;