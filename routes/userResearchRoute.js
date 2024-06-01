import express from 'express'
import { getUserResearchController } from '../controllers/userResearchController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/',auth,getUserResearchController)

export {router as userResearchController}