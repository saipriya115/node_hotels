const jwt=require('jsonwebtoken')
//require('dotenv').config()

const jwtauthmiddleware=(req,res,next)=>{
    //first check the request header has authorization or not 
    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error:'token not found'})
    //extract the jwt token from the request header
    const token=req.headers.authorization.split(' ')[1]//here we know that in headers we send the token in format of bearer
    // space token so we need to extract token which is in first index position and we know that bearer is in 0 index 
    //position 
    if(!token){
        console.log("error")
        return res.status(401).json({error:'unauthorized'})}
    //matlab isko token mila hi nahi
    try{
        //verify the jwt token 
        const decoded=jwt.verify(token,process.env.SECRET_KEY)//we pass token and secret key 
        //so after jwt verifies token if it is successfull then it returns payload which was used intially to create a 
        //token 
        req.user=decoded //that means whatever payload we got from above we want to send it return to server(which is users
    //information only),here for request object we are creating new key called user and in that we are adding decoded 
    //it could be anything like jwtpayload
    //bus jo request ja raha haina server ke pass uske beech me he hum ek key add kar dete hain jiske dwara pura payload
    //server ke pass chale jayega 
    next()
 }catch(err){
    console.log(err)
    res.status(401).json({error:'invalid token'})
 }
}
//function to generate jwt token 
const generatetoken=(userdata)=>{
    //this function takes parameter payload which is usersdata 
    return jwt.sign(userdata,process.env.SECRET_KEY,{expiresIn:300000})//this function takes userdata and secret key 
}

module.exports={jwtauthmiddleware,generatetoken}