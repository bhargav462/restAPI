const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const postSchema = new Schema({
    userPost:{
        type: Buffer
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Photos",postSchema);