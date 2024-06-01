const Person=require('./models/person')
const LocalStrategy=require('passport-local').Strategy
const passport=require('passport')
//now in local strategy we need some kind of verification function which determines that whether the username and password
//we are getting are valid or not,here along with username and password we also pass callback function called done which
//provides passport
passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
      //authentication logic here 
      try{
       // console.log("received credentials",USERNAME,password)//here we will check if any data is present in database
        //with that username and if present we will also check pasword if it is same as of which is saved in database
        //if yes authentication is provided 
        const user=await Person.findOne({username:USERNAME})//so here in person table it is checking if username is matching
         //done is a callback function provided by passport which gives signal that authentication verification has
         //completed even if its a pass or fail 
         if(!user)
                return done(null,false,{message:'incorrect username'})
              //suppose we got the user now we need to check for password 
            const ispasswordmatch= await user.comparePassword(password)
            
            if(ispasswordmatch){
               return done(null,user)
            }
            else{
              return done(null,false,{message:'incorrect password'})
            }

      }catch(err){
            return done(err)
      }
}))
module.exports=passport
//export configured passport