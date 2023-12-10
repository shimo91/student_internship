const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import Schema from mongoose

const topicSchema = new Schema({
  topicId: {
    type: Schema.Types.ObjectId,
    ref: 'students' // Reference the 'students' collection
  },
  project_topic: String,
  topic_link: String,
  youtube_link: String,
});

const Topic = mongoose.model('topics', topicSchema);

module.exports = Topic;
