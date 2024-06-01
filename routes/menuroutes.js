const express=require('express')
const router=express('router')
const menuitem=require('./../models/menuitem')
router.get('/',async (req,res)=>{//here we are using async because there is certain dboperation that takes time
    try{
  
    const data=await menuitem.find()
    
    console.log("data fetched")
    res.status(200).json(data)
  
    }catch(err){
        //if in the above error happens in the catch block in saving 
        //then for that catch block is present to handle that error 
        console.log(err) 
        res.status(500).json({error:'internal server eroor'})
    }
   })
   router.post('/',async (req,res)=>{
    try{
        const data=req.body 
        const newmenu=new menuitem(data)
        const response=await newmenu.save()
        console.log("data saved")
    res.status(200).json(response)
  
    }catch(err){
        //if in the above error happens in the catch block in saving 
        //then for that catch block is present to handle that error 
        console.log(err) 
        res.status(500).json({error:'internal server eroor'})
    }
   })

    
module.exports=router 
//comment added for testing 
//when we check we know that everything is saved locally but to like save it in github we use git push 
//now if another person is making changes on same repository then we want that in our local too then we can use command git 
//pull means pull the online repo into local 
//now we know that we have database and database server locally now how to keep them online so that everybody can access
//it ,we have set up the database server locally through which we are performing these database operations 
//so online where database server is present on that we have to add our database so that it is accessible to everyone
