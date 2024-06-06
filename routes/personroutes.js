//express router helps us to manage the end points 
const express=require('express')
const router=express.Router()
const Person=require('./../models/person')//export the model called Person
const {jwtauthmiddleware,generatetoken}=require('./jwt')
//profile route 
router.get('/profile',jwtauthmiddleware,async (req,res)=>{
  try{
           const userdata=req.user//here what is user check from the jwtauthmiddleware 
           console.log(userdata)
           //now in this userdata we also have id using this id we can find the person also 
           const userid=userdata.id
           const user=await Person.findById(userid)
           res.status(200).json(user)
  }catch(err){
    console.log(err) 
    res.status(500).json({error:'internal server eroor'})
  }
  //here simply from token we fetched id and using that id we got the entire person data
  //in this we through token any persond data or profile can be displayed
})
router.get('/',jwtauthmiddleware,async (req,res)=>{//here we are using async because there is certain dboperation that takes time
    try{
  
    const data=await Person.find()
    
    console.log("data fetched")
    res.status(200).json(data)
  
    }catch(err){
        //if in the above error happens in the catch block in saving 
        //then for that catch block is present to handle that error 
        console.log(err) 
        res.status(500).json({error:'internal server eroor'})
    }
   })
   router.post('/signup',async (req,res)=>{//here we are using async because there is certain dboperation that takes time
    try{
  //here whatever data we are getting it is being stored in req.body 
    const data=req.body 
    const newperson=new Person(data)//new person will be similar to person
    const response=await newperson.save()//save the new person to database,here await is used so that we have to wait
    //until this db operation-wait is completed
    console.log("data saved")
    const payload={
      id:response.id,
      username:response.username
    }
    console.log(JSON.stringify(payload))
    const token=generatetoken(payload)//this function needs payload as input payload can be any users info
    console.log("token is:",token)
    res.status(200).json({response:response,token:token})//here we are sending token also along with response
    //now it is returning the data as a response we want token to be returned here 
    
  
    }catch(err){
        //if in the above error happens in the catch block in saving 
        //then for that catch block is present to handle that error 
        console.log(err) 
        res.status(500).json({error:'internal server eroor'})
    }
   })
   // /login route
   router.post('/login',async(req,res)=>{
    try{
      //extract username and password from request body 
      const {username,password}=req.body 
      //now we have to check in database for the username 
      const user=await Person.findOne({username:username})
      //if user does not exist or password does not match return error 
      if(!user || !(await user.comparePassword(password))) {//it might have two cases user is not present or password
        //might be incorrect 
         return res.status(401).json({error:'invalid username or password'})
         
      }
      //if username is correct and password is correct then we will generate token for that we need payload
      const payload={
        id:user.id,
        username:user.username//before through findone that particular userdata is present in user
      }
      const token=generatetoken(payload)
      //return token as response 
      res.json({token})

    }catch(err){
           console.log(err)
           res.status(500).json({error:"internal server error"})
    }
   })
   router.get('/:worktype',async (req,res)=>{
    try{
  const worktype=req.params.worktype//extract the worktype from url parameter
    if (worktype=='chef'|| worktype=='manager'||worktype=='waiter'){
         const response=await Person.find({Work:worktype})
         console.log('response fetched')
         res.status(200).json(response)
    }else{
          res.status(404).json({error:'invalid work type'})
    }
  }
    catch(err){
      console.log(err) 
      res.status(500).json({error:'internal server eroor'})
    }
 })
 router.put('/:id',async (req,res)=>{
     try{
        const personid=req.params.id//extract the id from url parameter
        const updatedata=req.body//this contains updated data
        //generally the id is sent through url parameter
        //and data which need to be updated is sent through body 
        const response=await Person.findByIdAndUpdate(personid,updatedata,{
    
        new:true,//return the updated document,it is set to true that means we will get the updated document,update
        //hone ke baad
        runValidators:true,//in mongoose person model we have some validations so this is set to true so that it will 
        //check all these validations update honese pehle 


     })
     if(!response){//there is also a possiblity that there is no such document with this id in that case it will not
        //send any response so in that case below following will happen 
        return res.status(404).json({error:'person not found'})
     }
        console.log('data updated')
        res.status(200).json(response)
            }catch(err){
                console.log(err) 
                res.status(500).json({error:'internal server eroor'})
            }
 })
 router.delete('/:id',async (req,res)=>{
    try{
        const personid=req.params.id 
        const response=await Person.findByIdAndDelete(personid)//this function findbyidandremove is present in mongodb
        if(!response){//there is also a possiblity that there is no such document with this id in that case it will not
            //send any response so in that case below following will happen 
            return res.status(404).json({error:'person not found'})
         }
            console.log('data deleted')
            res.status(200).json({message:'person deleted success'})
    }catch(err){
        console.log(err) 
        res.status(500).json({error:'internal server eroor'})
    }
           
 })
module.exports=router
//git status red files means all these files we havent saved yet,that means all these files are untracked until now 
//we havent added them in the git here all files became green that means git is watching if there are any changes being 
//made that means a tracker is being set to see if any changes are being madea
//here nodemodules are just the dependencies which we are installing,using in the local system so no need to keep track 
//of the node modules because we dont make any changes in it npm looks after it 
//hence we want git to never track node modules 