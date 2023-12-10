const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router()
const multer = require('multer'); 
require('../Models/FinalReport')

router.use("/file",express.static("fileuploaded"))
const fileSchema = mongoose.model("reportdatas")

const jwt = require('jsonwebtoken');

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


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './fileuploaded')
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = Date.now()
	  cb(null, uniqueSuffix+file.originalname)
	}
  })
  
  const upload = multer({ storage: storage })

router.post('/upload',verifytoken, upload.single('file'), async function (req, res, next) {
	
	const filename=req.file.filename
	const username=req.body.username

	try{
		const existingUser = await fileSchema.findOne({ username: username });

		if (existingUser) {
			return res.json({ status: "error", message: "Username already exists" });
		}
		await fileSchema.create({ filename: filename, username: username });
		res.send({ status: "ok" });
		// fileSchema.create({filename:filename,username:username})
		// res.send({status : "ok"})
	}catch(error){
		res.json({status: "error"})

	}
  })

  router.get('/filedata',verifytoken,async(req,res)=>{
	try{
		fileSchema.find({}).then((data)=>{
			res.send({status: "ok",data:data})
		})
	}catch(error){
		res.json({status: "error"})

	}
  })


 

router.get('/',verifytoken,async(req,res)=>
{
	res.send('sucess!!!!')
})



  module.exports = router;