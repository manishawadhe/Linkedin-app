const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


userRouter.get("/users", (req , res) =>{
    const { name, email, gender, password, age, city } = req.body;
    try{
        bcrypt.hash(password,5, async function(err,hash){
            if(err){
                console.log(err)
            }else{
                let user_obj = userModel({ name, email, gender, password:hash, age, city })
                await user_obj.save();
                mode:'cors'
                res.send("registerd successfully")
            }
        })
        
    }
    catch(err){
        res.send(err)
    }
    
})

userRouter.post("login", async(req,res)=>{
    const { name, email, gender, password, age, city } = req.body;
    try{
        const user = await userModel.find({email})
        console.log(user) 
        if(user.length>0){
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    
                    let token = jwt.sign( { userID : user[0]._id } , "masai" ) 
                }else{
                    res.send(err)
                }
            });
            
        }else{
            res.send("wrong credentials")
        }
    }
    catch(err){
        res.send(err)
    }
})

module.exports={
    userRouter
}