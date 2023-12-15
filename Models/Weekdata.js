const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import Schema from Mongoose

const weekDataSchema = new Schema({
  file: {
    data: Buffer, // Storing the file buffer
    contentType: String, // Storing the file's MIME type
    originalName: String, // Storing the original filename
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'userdatas' // Correct reference to the 'students' collection
  },
  week1Submitted: {
    type: Boolean,
    default: false, // Initially, the user hasn't submitted for Week 1
  },
  week2Submitted: {
    type: Boolean,
    default: false, // Initially, the user hasn't submitted for Week 1
  },
  week3Submitted: {
    type: Boolean,
    default: false, // Initially, the user hasn't submitted for Week 1
  },
});

const Weekdata = mongoose.model('Weeks', weekDataSchema);
module.exports = Weekdata;
