//we are using this file to define the model that is schema 
//by defining the schema mongoose will handle by itlself if anybody is typing the wrong name etc if anybody is typing number
//in string etc 
const mongoose= require('mongoose');
const bcrypt=require('bcrypt')

const personschema=new mongoose.Schema({
    name:{ 
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    Work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    //email{
        //unique:true
    //}
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})
personschema.pre('save',async function(next){
    const person=this//here this represents that for whatever record of personschema when save
    //save operation has to be done  pre middleware is called and that entire data we are storing in person 
    //hash the password only if it has been modified or new 
    if(!(person.isModified('password'))) return next()

      try{
             //hash password generation
             const salt=await bcrypt.genSalt(10)
             //hash password 
             const hashedpassword=await bcrypt.hash(person.password,salt)
             //override the plain password with hashed one 
             person.password=hashedpassword 

            next()
      }catch(err){
               return next(err)
      }
})//this will be triggerred when we want to perform save operation and here we pass next as callback
//which will tell the express that required operation is completed(hashing the password) now saving the document has to
//be done
personschema.methods.comparePassword=async function(candidatePassword){
     try{
          const ismatch=await bcrypt.compare(candidatePassword,this.password)
          return ismatch
     }catch(err){
        throw err
     }
}
//in this compare function what actually happens is prince-azssdsdnnjfjgdhd 
//so if i type agarwal it will extract salt from the above prince hashed string and then it will combine with agarwal then
//hash and then compare with the orignal prince-azssdsdnnjfjgdhd
//from the above schema we create the model 
const Person=mongoose.model("Person",personschema) 
module.exports=Person