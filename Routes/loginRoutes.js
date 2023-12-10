const express = require('express')
const router = express.Router()
const userData = require('../Models/UserData')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcryptjs')


router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(cors())

function verifytoken(req,res,next){
    try {
        const token = req.headers.token;
       // console.log("token :"+token)
        if(!token) throw 'Unauthorized';
        let payload=jwt.verify(token,'yourSecretKey');
        if(!payload) throw 'Unauthorized';
        //res.status(200).send(payload);
        next();
    } catch (error) {
        res.status(401).send('Error')
    }
}

router.get('/',async (req, res) => {
    try{
        const data = await userData.find()
        res.status(200).json(data)
    }
    catch(error){
        console.log(error)
    }
})




router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)

        
            const user = await userData.findOne({username});


        if (user) {
            //console.log('User found'+user._id);
            // checking the passwords by decrypting stored password with input password
            const matchPassword = bcrypt.compareSync(password, user.password)
            if (!matchPassword) {
                res.status(401).send('Invalid credentials')
            }else{
                var topicstatus = user.topic_status
                const std_name=user.first_name+" "+user.last_name;
                // Generate token with a unique identifier (e.g., user ID)
                let payload = { username: username, password: password ,userid : user._id,stdname : std_name,topicstatus:topicstatus};
                const token = jwt.sign(payload, 'yourSecretKey');
    
                // Send success response with token
             res.status(200).json({ message: 'success', token});
                // res.status(200).json(user);
            }


        } else {
            console.log('User not found');
            // Authentication failed
            res.status(401).send('Invalid credentials');
        }
}catch (err) {
        console.error('Error finding user:', err);
        res.json({ success: false });
        return;
    }
})


router.get('/getuser/:id',verifytoken,async(req,res)=>{
    try {
        const id=req.params.id;
        console.log('id is '+id)
        const data = await userData.findById(id);
        console.log("data is "+data)
        res.status(200).send(data);
    } catch (error) {
        console.log("error is :"+error)
        res.status(400).send(error);
    }
})




module.exports = router;