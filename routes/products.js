const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const Products = require('../models/Products');
const response = require('../library/response.json');
const mongoose = require('mongoose');

Router.post('/v1/products', (req,res,next) => {
    
            Products.create({
                categoryName : data.categoryName,
                productName : data.productName,
                imageUrl : data.imageUrl,
                description : data.description,
                productPrice : data.productPrice,
                quantity : data.quantity,
                timeStamp : new Date().getTime()
            })
            .then(products => {
                return res.status(201).json({message : response["201"]})
            })
            .catch(err => {
                return res.status(500).json({message : response["500"]}) 
            })
        
})

Router.put('/v1/updateProducts', (req,res,next) => {
   
            Products.updateOne({_id : mongoose.Types.ObjectId(data.productId)},
            {
                $set : {
                    categoryName : data.categoryName,
                    productName : data.productName,
                    imageUrl : data.imageUrl,
                    description : data.description,
                    productPrice : data.productPrice,
                    quantity : data.quantity,
                    timeStamp : new Date().getTime()
                }
            }
            )
            .then(products => {
                return res.status(200).json({message : response["200"]})
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({message : response["500"]})
            })
       
})

Router.get('/v1/products', (req,res,next) => {
            Products.find({})
            .then(products => {
                return res.status(200).json({data : products, message : response["200"]})
            })
            .catch(err => {
                return res.status(500).json({message : response["500"]})
            })
       
})

module.exports = Router;