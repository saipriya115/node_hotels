//function add(a,b){
  //  return a+b
//}
//result=add(2,3)
//console.log(result)
//var add=function(a,b){
  //  return a+b
//}
//result=add(2,7)
//console.log(result)
//var add=(a,b)=>{
  //  return a+b
//}
//result=add(2,4)
//console.log(result)
//var add=>(a+b)
//function callback(){
  //  console.log('hello')
//}
//function add(a,b,callback){
  // console.log(a+b)
    //callback()
//}
//add(2,3,callback)
//function sub(a,b,prince){
  //  console.log(a-b)
    //prince()
//}
//sub(6,5,() => {
  //  console.log('completed')
//});
//or sub(6,5,function(){
    //console.log("hello")
//})
//now whenever we want to use a package we need to import that package into our file 
var fs=require('fs')//this means we have the requirement of fs library
var os=require('os')
var user=os.userInfo()
console.log(user)
console.log(user.username)
//suppose i want to send a greeting message to this username for that we need a file which will contain the 
//greeting message so this file will be created by the fs
fs.appendFile('greeting.txt','heelo'+user.username,()=>{
    console.log("hi")
})
//console.log(os)
//we make different files but we keep them linked to the ser.js only one file is being run
//how to import files here
const notes=require('./notes.js')
const age=notes.age
console.log(age)
var result=notes.addnumber(2,3)
console.log(result)
//loadash is one powerfull package
var _=require('lodash')
var data=['person','person',1,1,4,6]
//loadash package is very much usefull
var filter=_.uniq(data)
console.log(filter)
console.log(_.isString('hello'))
const json='{"name":"arjun","age":24}'
const jsonobject=JSON.parse(json)
console.log(jsonobject)//to convert json format into object
//to convert object into json format we use stringify
console.log(typeof json)
const express=require('express')
const mongoose=require('mongoose')

const app=express()//creating an instance of express which stores everything about app
const db=require('./db')
//export the model called Person
const bodyparser=require('body-parser')
app.use(bodyparser.json())
const menuitem=require('./models/menuitem')
const personroutes=require('./routes/personroutes')
const menuroutes=require('./routes/menuroutes')


const passport=require('./auth')


app.use(passport.initialize())
//session is false it will not work but when you pass it as parameters it does work because in that case local strategy
//will take username and password through req.body and will match them with that of database 

//middlewere function 
const logrequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] request made to ${req.originalUrl}`)
  //we want here above time to be printed and url to be printed,konse url pe hit ho raha hain 
  next()
}
//if next is not there you will not go to next part that means you will not go to response part
//whwnever request is initiated middliwere works
//now i will username,password authentication in the below function as an middleware 
const passportmiddlewere=passport.authenticate('local',{session:false})
app.get('/',(req,res)=>{
  //here inside password authentication you have to pass strategy as a parameter which is localstrategy and session
  res.send('welcome to our hotel ')
})
app.use(logrequest)//if you want to use this for every route not only '/' this route
//app.get('/',(req,res)=>{ 
    
  //  var idli={
    //    hi:'hello'
   // }
    //res.send(idli)
   
//})


//now if mongodb server gets down then connection will be also lost
//now generally if we want to send any data we send it through body(through postman)and then at server the data is retreived 
//now its a complex process,generally inside body of the http requests data is sent ,to reterive that data and using it
//is a complex process 
//so for this body parser is available which extracts the body and the parses the jsondata into object and that is 
//available through req.body 
//until now we established database connection ,body parser ,we developed schema from that schema we developed model
//and we exported that model to server file(express file) now this model is resposible for dealing with database called
//person

//so here at this particular end point if data is being sent in our defined format then that data is saved
//app.post('/person',(req,res)=>{
  //here whatever data we are getting it is being stored in req.body 
  //const data=req.body 
  //const newperson=new Person(data)//here we are creating newperson similar to person
 //or newperson.name=data.name
  //newperson.age=data.age 
 // newperson.work=data.work 
 // now we must save this newperson data in the database 
 //newperson.save((error,savedperson)=>{
  //save function returns callback-error and persons data 
  //if(error){
    //console.log("error saving person",error)
    //now we should also send some response to client when data is not being saved
    //res.status(500).json({error:'internal server error'})
  //}else{
        //status is something which indicates that it is succesfull or not(data saving)
    //console.log('data saved successfully')
    //res.status(200).json(savedperson)
    //}
  //})

 //})
 app.use('/person',passportmiddlewere,personroutes)
 app.use('/menu',menuroutes)//in this case we have kept password local strategy as middlewere here
 //and it will check authentication for all the routes defined in menu `
 
 app.listen(3000,()=>{
  console.log("hello server")//tells us that server is alive
})//client requests through webbrowser and server responds to that request
//save() no longer expects a callback(like we used in post) beacause it decreases readability and increases complexity 
//and we know callback function is executed after the main function 
//async and await are usefull for database operations like for example it might take time for fetching persons data,we
//might have to wait until the persons data is fetched also it might take time to save persons data
//we have to wait until persons data is saved becaused we need to send response as well that persondata is saved or not
//that means we have to wait until some operations takes place-async and wait 
//now here we cannot use plain text as password because it could be easily hacked by anybody
//so we use here bcrypt,what does bcrypt do is-it converts the plain text into some random string by applying hash function
//password salt hashing-along with the password we also add some salt from our side(salt means some type of string)
//after that it is given to hashing algorithm and it generated random string also the salt is hidden in that random string

//now this hashed password+salt is stored in the database 
//we hash the password before saving it to the database
//now we must hash the password before saving it to the database 
//again here we use a mongoose middlewere called pre middleware Pre-Save Middleware: The userSchema.pre('save', async function(next) { ... }) function is used to add pre-save middleware. This middleware will run every time a save operation is called on a User document.
//Check Password Modification: The this.isModified('password') || this.isNew check ensures that the password is only hashed if it has been modified or if the document is new. This prevents rehashing an already hashed password on subsequent saves.
//hence password hashing is done automatically whenever user document is saved or updated 

//now what if we want to get the persons data on get method 

//here for everything we cannot make an end point like person/chef so we will use parametrized url 
 
 //express router is helpfull to modularize and organize your route handling code in node js application
 //update operation -put method 
 //id is used to identify any particular document 
 //crud operations
 //so to update first we need to find the document through unique id which is provided by 
 //mongodb  then we have to update it 
 //delete operation 
 //middlewere whenever you make a request to server and you get a response in between many process may happen which refers
 //to middlewhere 
 //for example if we want all the requests send to the server to be logged ,logging means kiss date or time pe konsa user 
 //hit kiya ,website ko enter kiya 
 //body parser,authentication,logging,modifying request data comes under middlewere 
 //authentication-to enter into hotel ,we will check is he even part of company
 //authorization-limited access ,if he is part of company what he is 
 //in nodejs we implement authentication using passport,passport is like third party middleware which will check the 
 //credentials of user,whenever user enters username and password passport checks if that username and password are
 //correct ,authentication establishes identity and authorization defines the permissions associated with that identity
 //so we will implement authentication as the middlewere function 
 //passport provides the flexibility for different strategies like through username or password or through direct google etc
 //here now we are going to use local strategy where we identify the authentication of user based on username and password
//now how the passport will check the username and password,it will get it from request.body 
//now in local strategy we need some kind of verification function which determines that whether the username and password
//we are getting are valid or not 
//bad request means some requirements are not enough to enter into that endpoint 
