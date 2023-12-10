const mongoose = require('mongoose');
const replySchema = mongoose.Schema({
    commentid:String,
    username:String,
    userid:String,
    discussionid:String,
    reply:String
})
const ReplyData = mongoose.model('reply', replySchema);
module.exports=ReplyData;