const express = require('express');     // requiring the express package
const router = express.Router();  // declearing in the router()

router.get('/',(req,res,next) =>{    // get the product
   res.status(200).json({
    message: 'handling GET requests to /products'
   });
});

router.post('/',(req,res,next) =>{    // post the product

    const product = {           // fields for request body
        name: req.body.name,
        price:req.body.price
    }
    res.status(200).json({     // response for the api call
     message: 'handling post requests to /products',
     createdProduct:product  // posted product wii be shown in the response
    });
 });

 router.get('/:productID',(req,res,next) =>{    // fetching the product by id
    const id = req.params.productID    //declaring the id of the proiduct in requested params            
    if(id === 'narayana'){        //assigning the id as narayana
    res.status(200).json({
     message: 'my code is working',  // this will be the response when  the "if" condition satisfies
     id: id
    });
}
    else {
        res.status(201).json({  // this will be the respoinse when "else" condition satisfies
            message: 'invalid'
           });
    }
 });


 router.patch('/',(req,res,next) =>{    // patch or update api call
    res.status(200).json({
     message: 'handling patch requests to /products'
    });
 });

 router.delete('/',(req,res,next) =>{   // delete api call
    res.status(200).json({
     message: 'handling delete requests to /products'
    });
 });


 module.exports = router;