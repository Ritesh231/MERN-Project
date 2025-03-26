const express =require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
app.use(cors())
app.use(express.json());
const PORT=process.env.PORT||5000
//schema
const schemaData=mongoose.Schema({
    plate: String,
    isHarmful: Boolean,
},{
    timestamps:true
})
const userModel=mongoose.model("notifications",schemaData)
//read
//http://localhost:5000/
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
app.put("/update/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { plate, isHarmful } = req.body;
  
      const data = await userModel.findOneAndUpdate(
        { _id: id },
        { plate, isHarmful },
        { new: true } // This option returns the updated document
      );
  
      if (data) {
        res.json({ success: true, message: "Data updated successfully", data });
      } else {
        res.json({ success: false, message: "Data not found" });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      res.json({ success: false, message: "Update failed" });
    }
  });
//delete data
//http://localhost:18000/delete/id
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    const  data=await userModel.deleteOne({_id:id})
    //acknowledgment to frontend
    res.send({success:true,message:"data deleted successfully",data:data})
})
mongoose.connect("mongodb://127.0.0.1:19000/numberplate")
.then(()=>{
    console.log("connected to MongoDB")
    app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log(err))
