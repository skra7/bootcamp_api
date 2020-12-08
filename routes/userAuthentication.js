const express = require('express');
const Router = express.Router();
const User = require("../models/User");
const {ObjectID} = require("mongodb");
const bcrypt = require('bcryptjs');
const md5 = require('md5');
const response = require("../library/response.json");

Router.post('/v1/signup', (req,res,next) => {
    let data = req.body;
    User.findOne({userName : data.userName})
    .then(user => {
        if(user) {
            return res.status(409).json({ message : response["409"]});
        }
        else {
                        User.create({
                            userName : data.userName,
                            emailAddress : data.emailAddress,
                            password : md5(data.password),
                            token : ObjectID()+""+ObjectID(),
                            timeStamp : new Date().getTime()
                        })
                        .then(final => {
                            console.log("done user created");
                            return res.status(201).json({ message : response["201"]});
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(500).json({ message : response["500"]});
                        })
                   
           
           
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ message : response["500"]});
    })
    
})

Router.post('/v1/login', (req,res,next) => {
    let data = req.body;
    User.findOne({userName : data.userName})
    .then(user => {
        if(!user) {
            return res.status(403).json({ message : response["403"]});
        }
        else {
            if(md5(data.password) === user.password) {
                return res.status(200).json({ data : user, message : response["200"]});
            }
            else {
                return res.status(410).json({ message : response["410"]});
            }
        }
    })
    .catch(err => {
        return res.status(500).json({ message : response["500"]});
    })
})

module.exports = Router;