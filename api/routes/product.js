const express = require('express');
const router = express.Router();
const Product = require('../model/productmodel');
const mongoose = require('mongoose');


// router.get('/list',(req,res,next) => {
router.get('/',(req,res,next) => {
    Product.find()
    .then(result => {
        res.status(200).json({
            status:true,
            message: 'Product fetched successfully',
            data: result
        })
    })
    .catch(err => {
        res.status(500).json({
            status:false,
            message: 'Error fetching products',
            error: err
        })
    })
})

router.post('/',(req,res,next) => {
 const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.body.productImage,
    description: req.body.description
})
 product.save()
 .then(result=> {
    console.log(result);
    res.status(200).json({
        status:true,
        message: 'Product created successfully',})
 })
})

router.get('/:productId',(req,res,next) => {
    const id = req.params.productId;
    console.log(id);
    Product.findById(id)
    .then(result => {
        if(result){
            res.status(200).json({
                status:true,
                message: 'Product fetched successfully',
                data: result
            })
        }else{
            res.status(404).json({
                status:false,
                message: 'Product not found'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            status:false,
            message: 'Error fetching product',
            error: err
        })
    })
})


module.exports = router;
