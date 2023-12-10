const express = require('express');
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}))
const DisData=require('../Models/DiscussionData');

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
        const data = await DisData.findById(id);
       // console.log("data is "+data)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})



router.get('/getUserlist/:id',verifytoken,async(req,res)=>{
    try {
        const id=req.params.id;
       // console.log("userlist id :"+id);
        const data = await DisData.find({userid: { $nin: [ id ] }}).sort({_id:-1});
       // console.log("description :"+data)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})
 
router.get('/getmylist/:id',verifytoken,async(req,res)=>{
    try {
        const id=req.params.id;
        //console.log("get my list id is : "+id)
        const data = await DisData.find({"userid": id}).sort({_id:-1});
        //console.log("data is "+data)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})


router.post('/add',verifytoken,async(req,res)=>{
    try {
        var item=req.body;
        const Data = new DisData(item);
        const saveData= await Data.save();
        //console.log("saveed : "+saveData);
        const insertedId = saveData._id;
       // console.log("insertedid : "+insertedId);
        // res.status(200).send({message:'success',id:insertedId});
        res.status(200).send({message:'saved',id:insertedId});
    } catch (error) {
        console.log("error")
        res.status(400).send({massage:'error'})
    }
})

router.put('/update/:id',verifytoken,async(req,res)=>{
    try {
        var item=req.body;
        //console.log("item for update"+item);
       const data= await DisData.findByIdAndUpdate(req.params.id,item);
        res.status(200).send({message:'Updated successfully'});
    } catch (error) {
        res.status(404).send({message:'Update not working'});
    }
})


router.delete('/remove/:id',verifytoken,async(req,res)=>{
    try {
        const id=req.params.id;
        console.log("inside remove");
        const savedata= await DisData.findByIdAndDelete(id);
        res.status(200).send('Deleted Successfully')
    } catch (error) {
        console.log("error is :"+error)
        res.status(404).send('Error!!');
    }
})

router.get('/total/:id',verifytoken, async (req, res) => {
    try 
    {
        const id=req.params.id;
        const totalDocuments  = await DisData.countDocuments({"userid": id});
       // console.log("total :"+totalDocuments)
        res.status(200).send({message:'total',total:totalDocuments});
    }
    catch (error) 
    {
        console.log("error is :"+error)
        res.status(404).send('Error!!');
    }
})



module.exports=router;