import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import { UserRouter} from './routes/user.js'

const app=express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    credentails:true
}))
app.use(cookieParser())
app.use('/auth',UserRouter)

mongoose.connect('mongodb://127.0.0.1:19000/authentication')

app.listen(process.env.PORT,()=>{
    console.log("Server is Running")
})