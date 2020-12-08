const express = require("express");
const Router = express.Router();

Router.use('/', require('./userAuthentication'));
Router.use('/', require('./products'));
Router.use('/', require('./orders'));

module.exports = Router;