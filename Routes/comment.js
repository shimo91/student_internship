const express = require('express');
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}))

const ComData=require('../Models/CommentData');
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

router.get('/get/:id',verifytoken,async(req,res)=>{
    try {
        const id=req.params.id;
        const data = await ComData.find({discussionid:id});
        console.log("data is "+data)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})


router.post('/add',verifytoken,async(req,res)=>{
    try {
        var item=req.body;
        const Data = new ComData(item);
        const saveData= await Data.save();
        console.log("saveed : "+saveData);
        // res.status(200).send({message:'success',id:insertedId});
        res.status(200).send({message:'saved'});
    } catch (error) {
        console.log("error")
        res.status(400).send({massage:'error'})
    }
})

router.put('/update/:id',verifytoken,async(req,res)=>{
    try {
        var item=req.body;
        console.log("item for update"+item);
       const data= await ComData.findByIdAndUpdate(req.params.id,item);
        res.status(200).send('Updated successfully');
    } catch (error) {
        res.status(404).send('Update not working');
    }
})


router.delete('/remove/:id',verifytoken,async(req,res)=>{
    try {
        const id=req.params.id;
        const savedata= await ComData.findByIdAndDelete(id);
        res.status(200).send('Deleted Successfully')
    } catch (error) {
        res.status(404).send('Error!!');
    }
})

module.exports=router;