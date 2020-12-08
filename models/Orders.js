const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

const OrderSchema = new Schema({
    userId : {type : String},
    totalAmount : {type : Schema.Types.Double},
    discount : {type : Schema.Types.Double},
    finalAmount : {type : Schema.Types.Double},
    productList: [
        {
          id: String,
          categoryName: String,
          productName : String,
          imageUrl: String,
          description : String,
          productPrice: Schema.Types.Double,
          quantity: Number,
        },
      ],
    description : {type : String},
    status: { type: String },
  statusCode: { type: Number },
    timeStamp : { type : Number},
});

const Orders = mongoose.model('orders', OrderSchema, 'orders');

module.exports = Orders;

