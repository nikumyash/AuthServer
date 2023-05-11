const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const messageRoute = require('./routes/messageRoute');
const loginRoute = require('./routes/loginRoute');

const app = express();
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true})
.then(()=>{
    console.log("connected to a database");
});

app.use(express.json())
app.use('/',loginRoute)
app.use("/message",messageRoute);

app.listen(3000,()=>console.log('Server currently listening to port 3000'));