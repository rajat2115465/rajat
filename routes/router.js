const express=require("express");
const router= new express.Router();
const Products=require("../models/ProductsSchema");
const USER=require("../models/userSchema");
const bcrypt=require("bcryptjs");
const authenticate=require("../middleware/authenticate");
router.get("/getproducts"  ,async(req,res)=>{
    try{
        const productsdata=await Products.find();
        // console.log("console data " + productsdata);
        res.status(201).json(productsdata);
    }catch(error){
      console.log("error" + error.message)
    }
})
router.get("/getproducts2"  ,async(req,res)=>{
  try{
      const productsdata=await Products.find();
      // console.log("console data " + productsdata);
      res.status(201).json(productsdata);
  }catch(error){
    console.log("error" + error.message)
  }
})

router.get("/getproductsone/:id" ,async(req,res)=>{
  try{
     const{id}=req.params;
    //  console.log(id)
     const individualdata=await Products.findOne({id:id});
    //  console.log(individualdata);
    res.status(201).json(individualdata);
  }catch(error){
    res.status(400).json(individualdata);
    console.log("error" + error.message)
  }
});
router.post("/login/register",async(req,res)=>{
  console.log(req.body);
  const {fname,email,mobile,password,cpassword}=req.body;
  if(!fname ||!email ||!mobile ||!password ||!cpassword){
    res.status(422).json({error:"fill the all data"});
    console.log("not data available");
  }
  try{
    const preuser=await USER.findOne({email:email});
    if(preuser){
      res.status(420).json({error:"this user is already present"})
    }else if(password!==cpassword){
      res.status(422).json({error:"password and cpassword not match"})
    }else{
      const finalUser=new USER({
        fname,email,mobile,password,cpassword
      });
      const storedata=await finalUser.save();
      console.log(storedata);
      res.status(201).json(storedata)
    }
  }catch(error){

  }
});
router.post("/login",async(req,res)=>{
  console.log(req.body);
  const {email,password}=req.body;
  if( !email || !password ){
    res.status(400).json({error:"fill the all data"});
    console.log("not data available");
  }
  try{
    console.log("hi");
    const preuser=await USER.findOne({email:email});
    console.log(preuser);
    if(preuser){
      console.log(preuser);
      const ismatch=await bcrypt.compare(password,preuser.password);
      const cart_value=preuser.carts.length;
      console.log(cart_value);
      console.log(ismatch);
      const token = await preuser.generateAuthtoken(); 
      // res.send(token);  //me
      console.log(token);
      res.cookie("raja",token);
      // res.setHeader("set-cookie",["raja=1234",]);
      if(!ismatch){
        res.status(400).json({error:"Invalid details"});
      }else{
        // res.status(201).json({error:"Invalid details"})
        res.status(201).json(cart_value);   
      }
    }else{
      res.status(400).json({error:"Invalid details/"});
    }
  }catch(error){
    res.status(400).json({error:"enter the details"});
  }
});

router.post("/addcart/:id",authenticate,async(req,res)=>{
  try{
    console.log(req.cookies.raja);
    const {id}=req.params;
    const cart= await Products.findOne({id:id});
    console.log(cart+"cart value");
    const Usercontact=await USER.findOne({_id:req.userID});
    // console.log(Usercontact);
    if(Usercontact){
      const cartdata=await Usercontact.addcartdata(cart);
      await Usercontact.save();
      // console.log(cartdata);
      res.status(201).json(Usercontact);
    }else{
      res.status(401).json({error:"invalid user"});
    }
  }catch(error){
      res.status(401).json({error:"invalid user"});
      console.log(error);
      }
});
router.get("/cartdetails",authenticate,async(req,res)=>{
  try{
    const cart_data= await USER.findOne({_id:req.userID});
    console.log(cart_data);
    res.status(201).json(cart_data);
  }catch(error){
      res.status(401).json({error:"error"});
      console.log(error);
      }
});

module.exports=router; //me