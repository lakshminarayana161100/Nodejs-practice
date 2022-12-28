const express = require ('express')   // requiring the express package
const app = express();  // using the express package in the app.js file
const bodyParser = require('body-parser')   // requiring the body-parser package
const mongoose = require('mongoose')   // requiring the body-parser package
const productRouter = require('./routes/products')  // declaring the path of products.js

const product = require('./routes/product')

/*mongoose.connect('mongodb+srv://lakshminarayana:narayana@cluster0.ewnrqzl.mongodb.net/?retryWrites=true&w=majority',{
    useUnifiedTopology: false,
    useNewUrlParser:true,
    
})
mongoose.set('strictQuery', true)
.then (
    () =>console.log('DB connected')
).catch(err => console.log(err))*/

const url =('mongodb+srv://lakshminarayana:narayana@cluster0.ewnrqzl.mongodb.net/?retryWrites=true&w=majority');
mongoose.set('strictQuery', false)
mongoose.connect(url)
.then(response =>{
console.log("MongoDB connected");
}).catch(err =>{
    console.log(err);
    console.log("err connecting mongoose");
})



app.use(bodyParser.urlencoded({extended: true})); // true allows it to parse rich data , false allows you to parse simple data
app.use(bodyParser.json()); //using bodyparser

app.use('/products',productRouter)
app.use('/product',product)



module.exports=app; // exporting the app module
