const mongoose = require("mongoose")
const studentSchema = mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        // index: true 
    },
    exit_score:{
        type: Number,
    }
})
const StudentData = mongoose.model('studentdatas',studentSchema)
module.exports = StudentData
