import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import User from "../models/userModel.js"

/>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CREATE A JWT TOKEN>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/
const createToken = (_id)=>{return jwt.sign({_id},process.env.SECRET,{expiresIn:"10d"})}


/>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> REGISTER USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/
export const registerUser = async(req,res)=>{
//Grab data from request body
const{firstName,lastName,email,password,role}=req.body
//Check that the fields are not empty
 if(!firstName || !lastName || !email || !password || !role){
  return res.status(400).json({error: 'All fields are required'})
 }
//Check if email already exists
const userExists = await User.findOne({email})
if(userExists){
 return res.status(400).json({error:'User already exists'})
}
//Hash the password
const salt = await bcrypt.genSalt(10)
const hashed = await bcrypt.hash(password,salt)
//Everything exists
try {
 const user = await User.create({firstName,lastName,email,password:hashed,role})
 const token = createToken(user._id)
 res.status(200).json({msg:'user created:',firstName,role,email,token})
} catch (error) {
 res.status(500).json({error:error.message})
}
}

/>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LOGIN >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/
export const loginUser = async(req,res)=>{
 //Grab data from request body
 const{email,password}=req.body
 if(!email || !password){
  return res.status(400).json({error:'All fields are required'})
 }
 //Check if user and password entry is correct 
 const user = await User.findOne({email})
 if(!user){
  return res.status(400).json({error:'Incorrect email or password'})
 }
 //Check if password matches
 const match = await bcrypt.compare(password,user.password)
 if(!match){
  return res.status(400).json({error:'Incorrect email or password'})
 }
 //If everything passes
 try {
  const token = createToken(user._id)
  res.status(200).json({msg:'Login Successful:',
  firstName:user.firstName,
  role:user.role,
  email:user.email,
  token
 })
 } catch (error) {
  res.status(500).json({error:error.message})
 }
}