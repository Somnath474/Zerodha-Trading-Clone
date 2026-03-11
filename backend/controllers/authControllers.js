import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async(req,res)=>{

 const {email,password} = req.body;

 const hashedPassword = await bcrypt.hash(password,10);

 const user = new User({
   email,
   password:hashedPassword
 });

 await user.save();

 res.json("User created");

};

export const login = async(req,res)=>{

 const {email,password} = req.body;

 const user = await User.findOne({email});

 if(!user){
  return res.status(400).json("User not found");
 }

 const isMatch = await bcrypt.compare(password,user.password);

 if(!isMatch){
  return res.status(400).json("Invalid password");
 }

 const token = jwt.sign(
   {id:user._id},
   "SECRETKEY",
   {expiresIn:"1d"}
 );

 res.json({token});

};