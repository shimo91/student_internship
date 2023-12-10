const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  email: {type:String,
    required: true,
    unique:true,
    lowercase: true,
    index: true },
  docLink: { type: String, required: true },
  reportName: { type: String, required: true }, 
  submissionStatus: { type: String, default: 'pending' },
});

const Submission = mongoose.model('GoogledocSubmission', submissionSchema);

module.exports = Submission;
