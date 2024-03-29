const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const session = require('express-session');
const user = require('./routes/user');
const salle = require('./routes/salle');
const UserModel = require('./Models/user');

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
app.use(express.json())

app.use('/user',user)
app.use('/salle',salle)




//Login Method
app.post('/login',async  (req, res) => {
    const { username, password } = req.body;
    try {
    const user =  await UserModel.findOne({ username : username });
   // User not found
    if (!user) {
    return res.status(401).send('Invalid username ');
    }else{
   // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(password, user.password, (err, result) => {
   if (result) {
    // Store user data in session
    req.session.user = user;
    res.status(200).send('Welcome !! User Connected');
    } else {
    res.status(401).send('Invalid  password');
    }
    });
} } catch (error) {
    res.status(400).json({ error });
  }
});



mongoose.connect(MONGODB_URL).then(()=>{
    console.log('connecting to mongodb');
app.listen(port,()=>{
    console.log('listening on port 9000');
})
}).catch((err)=>{
    console.error('Error connecting to mongodb :' , err.message);
})