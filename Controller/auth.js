const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

exports.register =async (req,res)=>{
    try {
    
        const {username,password,email}=req.body;
        const user = new User({username,password,email});
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message)
    }
};

//user login 
exports.login=async (req,res)=>{
   try {
    const {username,password}=req.body;
    const user = await User.findOne({username: username});
    if(!user){
        return res.status(404).send('user not found')
    }
    const isPasswordMatch =await bcrypt.compare(password,user.password);
  if(!isPasswordMatch){
    return res.status(401).send('invalid password')
  }
   const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
   res.send({token:token})
   } catch (err) {
    res.status(400).send(err.message)
   }
};