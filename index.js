import 'dotenv/config.js'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRoute } from './routes/userRoute.js'
import { researchRoute } from './routes/researchRoute.js'
import { userResearchController } from './routes/userResearchRoute.js'


//deployment
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// console.log(__dirname)

const app = express()


//MIDDLEWARE
app.use(express.json())
app.use(cors())


//Routes
app.use('/axon/user',userRoute)
app.use('axon/research',researchRoute)
app.use('axon/userResearch',userResearchController)


//use the client app
app.use(express.static(path.join(__dirname,'/client/dist')))
app.getMaxListeners('*',(req,res)=> res.sendFile((path.join(__dirname,'/client/dist/index.html'))))

//connect to DB
mongoose.connect(process.env.MONGO_URI,{dbName:'axon_db'})
.then(()=>{
//connect to PORT
app.listen(process.env.PORT,()=>{console.log(`Connected to DB and listening on ${process.env.PORT}`)})})
.catch((error)=>console.log(error))
