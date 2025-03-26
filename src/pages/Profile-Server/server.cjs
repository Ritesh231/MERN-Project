const express =require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const  app=express()
app.use(cors())
app.use(express.json());
const PORT=process.env.PORT||3001
//schema
const schemaData=mongoose.Schema({
  userId: Number,
  name: String,
  organizationName: String,
  emailAddress: String,
  paymentAmount: Number,
},{
    timestamps:true
})
const userModel=mongoose.model("user",schemaData)
//read
//http://localhost:3001/
app.get("/",async(req,res)=>{
    const data=await userModel.find({})
    res.json({success:true,data:data})
})

//create data//save data in mongodb

app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data=new userModel(req.body)
    await data.save();
    res.send({success:true,message:"data save successfully",data:data})
})
//update data
app.put("/update",async(req,res)=>{
  console.log(req.body)

})

mongoose.connect("mongodb://127.0.0.1:19000/profile")
.then(()=>{
    console.log("connected to MongoDB")
    app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log(err))