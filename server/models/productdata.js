const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/productDb',function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("connected")
    }
});
const Schema=mongoose.Schema;

var newProductSchema=new Schema({
    productId:Number,
    productName:String,
    productCode:String,
    releaseDate:String,
    description:String,
    price:Number,
    starRating:Number,
    imageUrl:String
},{ collection: 'product' });

var Productdata=mongoose.model('product',newProductSchema);


module.exports=Productdata;