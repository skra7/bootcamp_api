const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-double')(mongoose);


const ProductSchema = new Schema({
    categoryName : {type : String},
    productName : {type : String},
    imageUrl : {type : String},
    description : {type : String},
    productPrice : {type : Schema.Types.Double},
    quantity : {type : Number},
    timeStamp : { type : Number}
});

const Products = mongoose.model('products', ProductSchema, 'products');

module.exports = Products;

