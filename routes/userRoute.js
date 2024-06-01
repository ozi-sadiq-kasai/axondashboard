import express from 'express'
import { registerUser,loginUser } from '../controllers/userController.js'

const router = express.Router()

//Routes
router.post('/',registerUser)
router.post('/login',loginUser)

export {router as userRoute}