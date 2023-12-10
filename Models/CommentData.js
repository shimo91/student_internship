const mongoose = require('mongoose');
const comSchema=mongoose.Schema({
    userid:String,
    username:String,
    discussionid:String,
    comment:String
})
const CommentData=mongoose.model('comment',comSchema);
module.exports=CommentData;