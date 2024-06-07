const mongoose=require("mongoose");
const productsSchema=new mongoose.Schema({
    // id:String,
    // url:String,
    // detailsUrl:String,
    // title:Object,
    // price:Object,
    // description:String,
    // discount:String,
    // tagline:String
    "id": String,
      "title": Object,
      "description": String,
      "price": Object,
      "discountPercentage": String,
      "rating": String,
      "stock": String,
      "brand": String,
      "category": String,
      "images": Array
});
const Products= new mongoose.model("products",productsSchema)
module.exports=Products;