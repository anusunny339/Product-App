const express=require('express');
const Productdata=require('./models/productdata');
const Userdata=require('./models/userdata');
const cors=require('cors');
var bodyparser=require('body-parser');
const jwt=require('jsonwebtoken')
var app=new express();
const port=3000;
app.use(cors());
app.use(bodyparser.json());
app.get('/products',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    Productdata.find()
    .then(function(product){
        res.send(product)
    })
});

app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    console.log("jj");
    console.log(req.body)
    var product={
        productId:req.body.product.productId,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        releaseDate:req.body.product.releaseDate,
        description:req.body.product.description,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageUrl:req.body.product.imageUrl
        

    }
    var product=new Productdata(product)
    product.save();
    
});

   app.post('/delete',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
   // console.log("delete")
    id=req.body.pid;
    console.log(id)
    Productdata.deleteOne({_id:id},function(err,result){
        if(result){
            console.log("deleted")
        }
    })

   })
    
  /* app.post('/edit', function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    id=req.body.pid;
    console.log("edit",id);
    Productdata.findOne({_id:id})
    .then(function(product){
        res.send(product)
        console.log(product)
    })
  });*/

  app.post('/update',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
     id=req.body.pid;
    var product={
        productId:req.body.product.productId,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        releaseDate:req.body.product.releaseDate,
        description:req.body.product.description,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageUrl:req.body.product.imageUrl
        

    }

    console.log(product.productCode)
    Productdata.updateOne({_id:id},{$set:product})
    .then(function(product){
        res.send(product)
    })
});
  
app.post('/register',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    console.log("register");
    console.log(req.body)
    var user={
        firstName:req.body.user.firstName,
        lastName:req.body.user.lastName,
        city:req.body.user.city,
        contactNo:req.body.user.contactNo,
        email:req.body.user.email,
        password:req.body.user.password
    
    }
    var user=new Userdata(user)
    user.save();
    
});

app.post('/login',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    username=req.body.email;
    password=req.body.password;
    Userdata.findOne({ $and : [{ 'email' :  username },{ 'password' : password} ]})
   
    .then(function(user){
        if(user){

            //res.send(user)
            console.log("login"+user)
            let payload={subject:user._id}
            let token=jwt.sign(payload,'secretKey')
             res.send({token})
             
        }
        else{
            res.send("invalid")
            console.log("invalid"+user)
           
        }
       
    })
  /* Productdata.findOne({ $and : [{ 'email' :  username },{ 'password' : password} ]},(user,err)=>{
        if(user){
            res.status(401).send('login')
        }
        else{
            
                res.status(401).send('invalid email')
            
        }
    })*/
    
})

app.listen(port,function(){
    console.log("server running on port"+port);
})

