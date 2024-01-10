var express = require('express')
var app=express()
var http=require('http');
var myfs= require('fs')

var body=require('body-parser')
var urlEncodded=body.urlencoded({extended:false})

app.use(express.static('public'))

app.get("/retrieveMain",function(req,res){

})


app.get("/retrieveForm",function(req,res){
    
})


app.get("/getAllProduct",function(req,res){
    
})


app.post("/requestProduct/:id",function(req,res){
    
    var prod=myfs.readFileSync('product.json')

    prod = JSON.parse(prod)
    if(req.params.id>0&&req.params.id<=6){
        res.send((users['user'+req.params.id]))
    }
    else{
        res.send("No user with the following Id: "+req.params.id)
    }
})


app.post("/addProduct",function(req,res){
    
})

app.get("/",function(req,res){

    res.send(__dirname+"/main.html");
})

var server=app.listen(8081,function(){
    var host = server.address().address
    var port= server.address().port
    console.log("working",host,port)
})