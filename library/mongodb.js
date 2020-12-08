const mongoose = require("mongoose");


mongoose.connect(`mongodb+srv://mongodb_admin:XB8LAdi0pLNYwdY4@clusterbootcamp.xdq20.mongodb.net/e_kaart?retryWrites=true&w=majority`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 })
const mongo =  mongoose.connection

module.exports = mongo;