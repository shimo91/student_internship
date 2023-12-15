const express = require('express');
const router = express.Router();
const cors = require('cors');


const student=require('../Models/StudentTopic');
const UserData = require('../Models/UserData');
const app=new express();
const jwt = require('jsonwebtoken');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors()); // Should be under express.json always

function verifytoken(req, res, next) {
  try {
    const token = req.headers.token;
  
    if (!token) throw 'Unauthorized';
    let payload = jwt.verify(token, 'yourSecretKey');
    if (!payload) throw 'Unauthorized';

    // Store the decoded payload in the request object for further use
    req.authUser = payload;
    next();
  } catch (error) {
    res.status(401).send('Error');
  }
}





router.get('/', verifytoken, async (req, res) => {
  try {
    const userEmail = req.authUser ? req.authUser.username : null;

    if (!userEmail) {
      // No authenticated user, send all topics
      const data = await student.find();
      return res.json(data);
    }

    const user = await UserData.findOne({ username: userEmail });
    
    if (user && user.topic_id) {
      // Returning user with a selected topic, send only the selected topic
      const selectedTopic = await student.findById(user.topic_id);
      return res.json(selectedTopic ? [selectedTopic] : []);
    }

    // Returning user with no selected topic
    // You might want to handle this scenario, possibly by sending all topics
    const allTopics = await student.find();
    return res.json(allTopics);
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
    res.status(500).json({ error: 'Error occurred while fetching data' });
  }
});













// ... (existing code)

router.post('/topic', verifytoken, async (req, res) => {
  try {
    const { projectId } = req.body; // Assuming projectId contains the ObjectId of the selected topic
    const userEmail = req.authUser.username; // Assuming you have user's email in the payload

    console.log("auth user email", userEmail);
    console.log('Updating User Data with topic_id:', projectId);
    const currentDate = new Date();

    // Find the user by their email and update the topic_id
    const updatedUser = await UserData.findOneAndUpdate(
      {  username : userEmail }, // Assuming email is a field in your UserData model
      { $set: { topic_id: projectId, topic_status: true, start_date : currentDate } },
    
      { new: true } // To return the updated document
    );

    if (updatedUser) {
      console.log('User Data updated successfully:', updatedUser);
      res.status(200).json(updatedUser); // Sending back the updated user data
    } else {
      console.log('User not found or data update failed.');
      res.status(404).json({ message: 'User not found or data update failed.' });
    }
  } catch (error) {
    console.error('Error storing topic:', error);
    res.status(400).send(error);
  }
});



    

router.get('/getData/:id',verifytoken,async(req,res)=>{
  try {
      const id=req.params.id;
      //console.log('topic_id is '+id)
      const data = await student.findById(id);
      //console.log("topic data is:"+data)
      res.status(200).send(data);
  } catch (error) {
      console.log("error is :"+error)
      res.status(400).send(error);
  }
})

module.exports = router;