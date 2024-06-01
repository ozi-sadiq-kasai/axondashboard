import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
 firstName:{
  type:String,
  required:true
 },
 lastName:{
  type:String,
  required:true
 },
 email:{
  type:String,
  required:true,
  unique:true
 },
 password:{
  type:String,
  required:true
 },
 role:{
  type:String,
  required:true,
  enum:['Doctor','Nurse','Admin']
 },
},{timestamps:true})

export default mongoose.model('User', userSchema)