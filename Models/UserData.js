const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
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
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: 'students', 
        unique: true// Reference the 'students' collection
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
    },
    topic_status: {
        type: Boolean,
        default: false, 
      },
})

const UserData = mongoose.model('userdatas',userSchema)
module.exports = UserData