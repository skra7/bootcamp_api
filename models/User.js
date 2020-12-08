const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName : {type : String},
    token : {type : String},
    password : {type : String},
    emailAddress : {type : String},
    timeStamp : {type : Number}
});

const User = mongoose.model('user', UserSchema, 'user');

module.exports = User;

