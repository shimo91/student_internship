const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        index: true 
    },
    password: {
        type:String,
        required: true
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    phone: {
        type: String
    },
    topic_status: {
        type: Boolean
    },
    topic_id: {
        type: String
    },
    start_date: {
        type: Date
    },
    week_1_marks: {
        type: Number
    },
    week_2_marks: {
        type: Number
    },
    week_3_marks: {
        type: Number
    },
    finalreport_marks: {
        type: Number
    },
    vivavoce_marks: {
        type: Number
    },
    week_1_cmnts:{
        type: String
    },
    week_2_cmnts:{
        type: String
    },
    week_3_cmnts:{
        type: String
    },
    final_cmnts:{
        type: String
    },
    viva_cmnts:{
        type: String
    }
})

const UserData = mongoose.model('userdatas',userSchema)
module.exports = UserData