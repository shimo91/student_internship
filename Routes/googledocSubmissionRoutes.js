const express = require('express');
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
// const { submitForm, getVivavoce} = require('../controllers/GoogledocSubmissionController');

// const router = express.Router();

// router.post('/googledoclinksubmit',submitForm);
// router.post('/getvivavoce', getVivavoce);

// module.exports = router;


// const express = require('express');
const { submitForm, getVivavoce} = require('../controllers/GoogledocSubmissionController');

const router = express.Router();

router.post('/api/googledoclinksubmit', verifytoken,submitForm);
router.post('/api/getvivavoce', verifytoken,getVivavoce);

module.exports = router;