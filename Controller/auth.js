const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

exports.register =async (req,res)=>{
    try {
        console.log(req.body.email);
        const {username,password,email}=req.body;
        const user = new User({username,email,password});
        await user.save();
        console.log(user)
        res.render('login',{msg:
        "Registration success! Login now to access your account. Let's get started!"});
    } catch (error) {
        res.render('register',{msg:error.message});
    }
};

//user login 
exports.login=async (req,res)=>{
    console.log(req.body);
   try {
    const {username,password}=req.body;
     
   const user = await User.findOne({username: username});
    if(!user){
     res.render('login',{msg:"user not found"});
    }
    const isPasswordMatch =await bcrypt.compare(password,user.password);
  if(!isPasswordMatch){
    res.render('login',{msg:"invalid password"});
  }
   const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
   
   res.redirect('/salle/user/')
   } catch (err) {
    
    res.render('login',{msg:err.message});
   }
};