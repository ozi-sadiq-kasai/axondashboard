import express from 'express'
import{
 getResearch,
 singleResearch,
 createResearch,
 updateResearch,
 deleteResearch
}from '../controllers/researchController.js'
import auth from '../middlewares/auth.js'


const router = express.Router()

//Routes
router.get('/',getResearch)
router.get('/:_id',singleResearch)
router.post('/',auth,createResearch)
router.put('/:_id',auth,updateResearch)
router.delete('/:_id',auth,deleteResearch)

export {router as researchRoute}