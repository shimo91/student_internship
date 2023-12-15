const mongoose = require('mongoose');
const topicShema=mongoose.Schema({
    project_topic: {
        type: String,
        required: true
      },
      project_description: {
        type: String
      },
      project_image: {
        type: String 
      },
     
     
    });

const StudentTopic=mongoose.model('students',topicShema);
module.exports=StudentTopic;