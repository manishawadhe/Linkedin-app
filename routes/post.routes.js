const express = require("express")
const {postModel} = require("../model/post.model")


const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    const posts = await postModel.find()
    res.send(posts)
})


postRouter.post("/top",async(req,res)=>{
    const payload = req.body
    try{
        const post_obj = new postModel(payload)
        await post_obj.save()
        res.send("new post created")
    }catch(err){
        res.send("something went wrong")
    }
})


postRouter.patch("/update/:id",async(req,res)=>{
    const post_id = req.params.id
    const payload  = req.body

    
    const post = await Model.findOne({"_id":post_id})
    const user_id_in_post = post.user_id

    

    const user_id_making_req = req.body.user_id


    try{
        if(user_id_making_req == user_id_in_post){  
            const updated_post = await postModel.findByIdAndUpdate({_id:post_id},payload)
            res.send("post has been updated")
            console.log(updated_post)
        }else{
            res.send({"msg":"you are not authorized"})
        }   
        
    }catch(err){
        console.log(err)
        res.send("post doesn't updated")
    }
})


postRouter.delete("/delete/:id",async(req,res)=>{
    const post_id = req.params.id

    
    const post = await postModel.findOne({"_id":post_id})
    const user_id_in_post = post.user_id


    const user_id_making_req = req.body.user_id

    try{
        if(user_id_making_req == user_id_in_post){ 
            await postMpost.findByIdAndDelete({_id:post_id})
            res.send("post has been deleted")
            
        }else{
            res.send({"msg":"you are not authorized"})
        }   
        
    }catch(err){
        console.log(err)
        res.send("post doesn't deleted")
    }
})




module.exports={
    postRouter
}

