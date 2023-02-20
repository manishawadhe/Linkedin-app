const express = require("express")
const { connection } = require("./config/db")
const { postRouter } = require("./routes/post.routes")
const {userRouter} = require("./routes/user.routes")
const { authentication } = require("./middleware/authentication.middleware")
require('dotenv').config()
const PORT = process.env.PORT 
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("welcome on home page")
})

app.use("/users",userRouter)

app.use(authentication)
app.use("/posts",postRouter)


app.listen(PORT,async()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(err){
        console.log(err , {err})
    }
  console.log(` server is running at port http://localhost:${PORT}`)
})