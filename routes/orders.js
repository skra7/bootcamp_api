const e = require('express');
const express = require('express');
const Router = express.Router();
const Orders = require('../models/Orders');
const User = require('../models/User');
const response = require('../library/response.json');
const mongoose = require('mongoose');

Router.post('/v1/orders', (req,res,next) => {
    let token = req.headers.authorization;
    let data = req.body;
    var totalCost = 0;
    var discount = data.discount || 0;
    data.productList = data.productList.map((p) => {
        totalCost += p.productPrice*p.quantity;
        return {
            id : p.id,
            categoryName : p.categoryName,
            productName : p.productName,
            imageUrl : p.imageUrl,
            description : p.description,
            productPrice : p.productPrice,
            quantity : p.quantity
        }
    })
    User.findOne({token : token})
    .then(user => {
        if(!user) {
            return res.status(401).json({message : response["401"]})
        }
        else {
            Orders.create({
                userId : user._id,
                totalAmount : totalCost,
                discount : discount,
                finalAmount : totalCost - discount,
                productList : data.productList,
                description : data.description,
                statusCode : 1,
                status : 'New',
                timeStamp : new Date().getTime()
            })
            .then(order => {
                return res.status(201).json({message : response["201"]})
            })
            .catch(err => {
                return res.status(500).json({message : response["500"]})
            })
        }
    })
    .catch(err => {
        return res.status(500).json({message : response["500"]})
    })
})

Router.put('/v1/updateStatus', (req,res,next) => {
    let token = req.headers.authorization;
    let data = req.body;
    User.findOne({token : token})
    .then(user => {
        if(!user) {
            return res.status(401).json({message : response["401"]})
        }
        else {
            Orders.updateOne({_id : mongoose.Types.ObjectId(data.orderId)},
            {
                $set : {
                    statusCode : data.statusCode,
                    status : data.status
                }
            }
            )
            .then(updated => {
                return res.status(200).json({message : response["200"]})
            })
            .catch(err => {
                return res.status(500).json({message : response["500"]})
            })
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({message : response["500"]})
    })
})

Router.get('/v1/orders', (req,res,next) => {
    let token = req.headers.authorization;
    let objectEnum = { 1 : "New", 2 : "Accepted", 3 : "Cancelled", 4 : "Delivered"};
    User.findOne({token : token})
    .then(user => {
        if(!user) {
            return res.status(401).json({message : response["401"]})
        }
        else {
            Orders.find({userId : user._id})
            .then(orders => {
                return res.status(200).json({data : {orders,enum : objectEnum}, message : response["200"]})
            })
            .catch(err => {
                return res.status(500).json({message : response["500"]})
            })
        }
    })
    .catch(err => {
        return res.status(500).json({message : response["500"]})
    })
})

module.exports = Router;