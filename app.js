const express = require('express')
const app = new express()
require('dotenv').config()
const cors = require('cors')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const path = require('path');
app.use(express.static(path.join(__dirname,'/build'))); 

const PORT = process.env.PORT

const morgan= require('morgan');
app.use(morgan('dev'));

require('./config/dbConnection')

// signup route
const signupRoutes = require('./Routes/signupRoutes')
app.use('/api/signup', signupRoutes)

const submissionRoutes = require('./Routes/googledocSubmissionRoutes');
app.use(submissionRoutes);


const loginRoutes = require('./Routes/loginRoutes')
app.use('/api/login',loginRoutes)

const marks = require('./Routes/markRoutes');
app.use('/api/marks', marks)

const reprotRoutes = require('./Routes/reportRoutes')
app.use('/api/report',reprotRoutes)


const routerFile = require('./Routes/forum');
app.use('/api/discussion',routerFile);

const routerCommentFile = require('./Routes/comment');
app.use('/api/comment',routerCommentFile);

const routerstudent = require('./Routes/Sdashboard');
app.use('/api/sdashboard',routerstudent);


const routerweek = require('./Routes/Week');
app.use('/api/week',routerweek);

const routertopic = require('./Routes/topic');
app.use('/api/topic', routertopic);

const routerReplyFile = require('./Routes/reply');
app.use('/api/reply',routerReplyFile);

const routerMetFile = require('./Routes/material');
app.use('/api/ref',routerMetFile);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname
    ,'/build/index.html')); });

app.listen(PORT,()=>{
    console.log('Listening to '+ PORT)
})