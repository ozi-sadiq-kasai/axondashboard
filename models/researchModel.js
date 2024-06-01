import mongoose from "mongoose";
const Schema = mongoose.Schema

const researchSchema = new Schema({
 user:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:"User"
 },
 title:{
  type:String,
  required:true 
 },
 total:{
  type:Number,
  required:true
 },
 status:{
  type:String,
  enum:['ongoing','completed'],
  required:true
 },
 date:{
  type:Date,
  required:true
 }
})

export default mongoose.model('Research', researchSchema)