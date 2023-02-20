const jwt = require("jsonwebtoken");

const authentication = (req,res,next) =>{
    const token = req.headers.authorization;
        if(token){
            jwt.verify(token, "masai", function(err,decoded){
                if(decoded){
                    console.log(decoded.userID);
                    req.body.user_id= decoded.userID;
                    next();
                }else{
                    res.send("please login!")
                }
            })
        }else{
            res.send("please login")
        }
} 

module.exports={
    authentication
}
