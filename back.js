var express = require('express')
var app=express()
var http=require('http');
var myfs= require('fs')

var body=require('body-parser')
app.use(body.json());
var urlEncoded=body.urlencoded({extended:false})

var prod=myfs.readFileSync('product.json')

app.use(express.static('public'))

app.get("/retrieveMain",function(req,res){

    res.sendFile(__dirname + '/public/main.html');
})


app.get("/retrieveForm",function(req,res){
    res.sendFile(__dirname + '/public/request.html');
})


app.get("/getAllProduct",function(req,res){

    res.send(prod.toString())
})


app.post("/requestProduct/:id",urlEncoded,function(req,res){
    prod = JSON.parse(prod)
    var prodId = req.params.id
    if(prodId>0&&prodId<=6){
        res.send((prod['prod'+prodId]))
    }
    else{
        res.send("No user with the following Id: "+prodId)
    }
})

app.post("/addProduct",urlEncoded,function(req,res){
    
    var newProduct = {
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    };
    // prod['prod'+newProduct.id]=newProduct
    // console.log("Received POST request to /addProduct",  prod.toString());
    // var prods = req.body
    myfs.writeFileSync('product.json',prod);
    res.send(newProduct);
})


var server=app.listen(8082,function(){
    var host = server.address().address
    var port= server.address().port
    console.log("working",host,port)
})