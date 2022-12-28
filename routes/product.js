const express = require('express')  // requiring all modules
const mongoose = require('mongoose');
const Product = require('../models/productSchema');

const router = express.Router();


router.get('/products', async (req,res) =>{ 
    try{   
        const products = await Product.find({})  // async makes a function return a Promise
                                                 //await makes a function wait for a Promise
        res.status(200).json({
            Totalproducts : products.length,   // length of the products in schema
            all:products
        })
    }catch (error) {
        res.status(400).send(error)
    }
    })
 //alternative way
    router.get("/product",(req,res,next) =>{
     Product.find()
     .exec()
     .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
     })
     .catch(err =>{
       res.status(500).json({
        error:err
       });
     });

    })
    
    router.post('/create',(req,res,next)=>{        // want to create product details
        const product = new Product({
            name: req.body.name,
            price:req.body.price
        });
        product.save()    // save shema
        .then(result => {     // async tasks
            res.status (201).json({      // responese success status
                message: "Product created" ,
                createdProduct: result
                
            })
            console.log(result);
        })
        .catch(error => { //catch error is used to catch any errors in the process
            console.error(error)
            res.status(400).json({Error: error}) // response error status
            console.log(error) //it outputs the web messages
        })
    
    })


    router.delete('/products/:id' ,async(req,res)=> {
        try{
            const deletedProduct = await Product.findByIdAndDelete ( {_id:req.params.id} )
            if(!deletedProduct) {
                res.status(404).json({error: "Product not found"})
    
            }
            res.status(400).json({message: "Product Deleted",
            deletedProduct})
        } catch (error) {
            res.status(400).send (error)
        }
        
    })

    router.put('/products/:id',async(req,res) => {
        const updates=Object.keys(req.body) //keys wilol be stored in updates ==> req body fields
        const allowedUpdates= ['name','price'] // updates that are allowed
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // validating the written key in req.body with the allowed updates
        if(!isValidOperation) {
            return res.status(400).json({ error : 'invalid updates'})
        }
        try{ // used to catch errors
            const product=await Product.findOne({_id:req.params.id}) //finding the products based on id
            if(!product){
                return res.status(404).json({ message:'Invalid Product'}) //error status
            }
                updates.forEach((update) => product [update] =req.body[update]) //updating the value
                        
                await product.save()    
                res.status(400).json({
                  updatedProduct: product
                })
        } catch (error) {
            res.status(400).json({error})
        }
    })


    router.delete("/:productId",(req,res,next)=>{
      const id = req.params.productId;
      Product.findByIdAndDelete({_id:id})
      .exec()
      .then(result =>{
        res.status(200).json({deletedProduct:result
        })
        console.log(result);
      })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
      })
    })



    module.exports = router;