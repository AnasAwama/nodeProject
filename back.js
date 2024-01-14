var express = require('express')
var app=express()
var http=require('http');
var myfs= require('fs')

var body=require('body-parser')
app.use(body.json());
var urlEncoded=body.urlencoded({extended:false})

var prod=myfs.readFileSync('product.json')
const prods = JSON.parse(prod); 
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

app.get('/checkProduct', (req, res) => {
    const prods = JSON.parse(prod); 

    const options = Object.entries(prods).map(([id, product]) => {
        if (!product || !product.name || !product.id) {
            console.error(`Invalid product data for ID ${id}: ${product.toString()}`);
            return ''; 
        }

        console.log(`ID: ${id}, Name: ${product.name}`);
        return `<option value="${id}">${product.name}</option>`;
    }).join('');

    const html = `
        <h1>Find a Product By Id</h1>
        <form action="http://localhost:8082/requestProduct" method="POST" enctype="application/x-www-form-urlencoded">
            <label for="productId">Select Product Id:</label>
            <select id="productId" name="id">
                ${options}
            </select><br />
            <input type="submit" value="Submit" />
        </form>`;

    res.send(html);
});

app.post("/requestProduct", urlEncoded, function (req, res) {
    
    const id = req.body.id;
    console.log("This is the value of prodId: " + id);

    if (id in prods) {
        res.send(prods[id]);
    } else {
        res.send("No product with the following Id: " + id);
    }
});


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