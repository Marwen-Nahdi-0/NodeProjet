const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const session = require('express-session');
const user = require('./routes/user');
const salle = require('./routes/salle');
const auth = require('./routes/auth');
const UserModel = require('./Models/user');
const reservation = require('./routes/reservation');

//create instance of express
const app = express();
const dotenv = require('dotenv');
//session
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
   }));
dotenv.config();
const  MONGODB_URL= process.env.MONGODB_URL;
const  port= process.env.PORT || 9000;

//create a middleware for parsing the content of body 
//app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/user',user);
app.use('/salle',salle); 
app.use('/auth',auth);
app.use('/reservation',reservation);
app.set('view engine','ejs');






app.get('/test',(req,res)=>{
    res.render('ListReservation');
})





mongoose.connect(MONGODB_URL).then(()=>{
    console.log('connecting to mongodb');
app.listen(port,()=>{
    console.log('listening on port 9000');
})
}).catch((err)=>{
    console.error('Error connecting to mongodb :' , err.message);
})