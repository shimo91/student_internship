
const mongoose = require('mongoose');

const weekDataSchema = new mongoose.Schema({
  file: {
    data: Buffer, // Storing the file buffer
    contentType: String, // Storing the file's MIME type
    originalName: String, // Storing the original filename
  },
  // Other fields related to the uploaded file or report, if needed
});

const Weekdata = mongoose.model('Weekdatas', weekDataSchema);
module.exports = Weekdata;
