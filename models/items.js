const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let itemSchema = new Schema({
    shopName:{
        type: String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    itemList:[{
     type: String
   }]
});

module.exports = mongoose.model("Items",itemSchema);