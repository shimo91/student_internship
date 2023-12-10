const mongoose = require('mongoose');
const metSchema=mongoose.Schema({
    topicId:String,
    data:String,
    description:String,
    type:String,
    ref:Number
})
const MaterialData=mongoose.model('material',metSchema);
module.exports=MaterialData;
