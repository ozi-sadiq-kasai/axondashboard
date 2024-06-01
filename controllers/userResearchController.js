import Research from '../models/researchModel.js'
import User from '../models/userModel.js'

export const getUserResearchController = async(req,res)=>{
//Grab the authenticated user form requet object
const user = await User.findById(req.user._id)
// Check if the user exists
if (!user) {
 return res.status(404).json({ error: 'User not found' });
}
try {
//Grab user's posts from DB
const userResearch = await Research.find({user:user._id}).sort({createdAt:'desc'})
res.status(200).json({research:userResearch,firstName:user.firstName,role:user.role})
} catch (error) {
 res.status(500).json({ error: error.message });
}

}