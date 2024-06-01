import Research from '../models/researchModel.js'
import User from '../models/userModel.js'
import mongoose from 'mongoose'

/>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET ALL RESEARCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/
export const getResearch = async(req,res)=>{
try {
 const research = await Research.find().sort({createdAt:'desc'})
 res.status(200).json({research})
} catch (error) {
 res.status(404).json({error:error.message})
}
}


/>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET SINGLE RESEARCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/
export const singleResearch = async(req,res)=>{
 const {_id} = req.params
 //Check if there is a correct id
 if(!mongoose.Types.ObjectId.isValid(_id)){
  return res.status(404).json({error:'Invalid ID format'})
 }
 try {
  //Check if there is a research
  const research = await Research.findById(_id)
  if(!research){
   return res.status(404).json({error:'Research does not exist'})
  }
//If it passes
  res.status(200).json(research) 
} catch (error) {
 res.status(400).json({error:error.message})
}
}



/>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CREATE RESEARCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/
export const createResearch = async(req,res)=>{
  const {title,status,total,date} = req.body
 //Chech that the fields are not empty
 if(!title || !status ||!total ||!date){
  return res.status(404).json({error:'All fields are required'})
 }

 // Find the authenticated user using the user id provided by request object
const user = await User.findById(req.user._id);
try {
 const research = await Research.create({user:user._id,title,status,total,date})
 res.status(200).json({research})
} catch (error) {
 res.status(400).json({error:error.message})
}
}


/>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> UPDATE RESEARCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/
export const updateResearch = async(req,res)=>{
 //Extract Id from request parameters
 const {_id}=req.params
 const {title,status,total,date}= req.body //Extract fields from request body

 //Check if id is valid
 if(!mongoose.Types.ObjectId.isValid(_id)){
  return res.status(404).json({error:'Invalid ID format'})
 }

 //Check if the research document exists
 const research = await Research.findById(_id)
 if(!research){
  return res.status(401).json({error:'Not authorized'})
 }

  // Check if the user owns the research document
  if (!research.user.equals(req.user._id)) {
    return res.status(401).json({ error: "Not authorized" });
  }

 try {
 //Update the research document fields
 research.title = title
 research.status = status
 research.total = total
 research.date = date
  await research.save()
  res.status(200).json({msg:'Research updated successfully',research})
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
}


/>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DELETE RESEARCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/
export const deleteResearch =async(req,res)=>{
const {_id} = req.params
 //Check if there is a correct id
 if(!mongoose.Types.ObjectId.isValid(_id)){
  return res.status(404).json({error:'Invalid ID format'})
 }
  // Check the research exists
  const research = await Research.findById(req.params._id);
  if (!research) {
    return res.status(400).json({ error: "Research not found" });
  }  
  // Check the user owns the redearch
  const user = await User.findById(req.user._id);
  if (!research.user.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized" });
  }  
  try {
  await research.deleteOne();
   res.status(200).json({msg: "Research was deleted." });
  }catch (error) {
  res.status(500).json({error:error.message})
 } 
}