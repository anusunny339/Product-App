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

var newUserSchema=new Schema({
    firstName:String,
    lastName:String,
    city:String,
    conatctNo:Number,
    email:String,
    password:String
},{ collection: 'user' });

var Userdata=mongoose.model('user',newUserSchema);


module.exports=Userdata;