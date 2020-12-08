const express = require('express');
const Router = express.Router();
const Category = require('../models/Category');
const User = require('../models/User');
const response = require("../library/response.json");
const mongoose = require("mongoose");

Router.post("/v1/category", (req,res,next) => {
    let token = req.headers.authorization;
    let data = req.body;
    User.findOne({ token : token})
    .then(user => {
        if(!user) {
            return res.status(401).json({ message : response["401"]});
        }
        else {
            Category.create({
                userId : user._id,
                categoryName : data.categoryName,
                description : data.description,
                productCount : 0,
                timeStamp : new Date().getTime()
            })
            .then(final => {
                return res.status(201).json({message : response["201"]})
            })
            .catch(err => {
                return res.status(500).json({message : response["500"]})
            })
        }
    })
    .catch(err => {
        return res.status(500).json({message : response["500"]});
    })
})

Router.put("/v1/categoryUpdate", (req,res,next) => {
    let token = req.headers.authorization;
    let data = req.body;
    User.findOne({token : token})
    .then(user => {
        if(!user) {
            return res.status(401).json({message : response["401"]})
        }
        else {
            Category.updateOne({_id : mongoose.Types.ObjectId(data.id)}, 
            {
                $set : {
                    categoryName : data.categoryName,
                    description : data.description,
                    timeStamp : new Date().getTime()
                }
            }
            )
            .then(category => {
                return res.status(200).json({message : response["200"]})
            })
            .catch(err => {
                return res.status(500).json({message : response["500"]})
            })
        }
    })
    .catch(err => {
        return res.status(500).json({message : response["500"]});
    })
})

Router.get("/v1/category", (req,res,next) => {
    let token = req.headers.authorization;
    User.findOne({token : token})
    .then(user => {
        if(!user) {
            return res.status(401).json({message : response["401"]})
        }
        else {
            Category.find({userId : user._id})
            .then(data => {
                return res.status(200).json({data : data, message : response["200"]})
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