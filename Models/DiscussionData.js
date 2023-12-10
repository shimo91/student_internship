const mongoose = require('mongoose');
const disSchema=mongoose.Schema({
    userid:String,
    username:String,
    title:String,
    description:String
})
const DiscussionData=mongoose.model('discussion',disSchema);
module.exports=DiscussionData;