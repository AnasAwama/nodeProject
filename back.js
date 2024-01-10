var express = require('express')
var app=express()
var http=require('http');
var myfs= require('fs')

var body=require('body-parser')
var urlEncodded=body.urlencoded({extended:false})

app.use(express.static('public'))



app.get("/",function(req,res){

    res.send(__dirname+"/index.html");
})

var server=app.listen(8081,function(){
    var host = server.address().address
    var port= server.address().port
    console.log("working",host,port)
})