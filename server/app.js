const {connectToDb}=require("./DB.CONFIG/db")
const express=require("express")
const users=require("./routes/userRoute")

require("dotenv").config()

let app=express()
const cors = require('cors')

app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use("/api/users",users)


let start=async()=>{
    try{
        app.listen(9000,()=>{
            console.log("port 9000 listening...");
        })
    
        
        await connectToDb()
    }
    catch(error){
        console.log(error);
    }
}

start()



