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
 app.use('/person',personroutes)
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
//now since every route is authenticated we should enter username and password for everything but here inside flipkart
//but when directing to some pages like coupons etc inside flipkart we are not entering username and password how?
//so for that sessions and tokens are helpfull,these are also usefull to track the users status suppose you added soething
//into the cart ,now these tokens and sessions contains some user information so again when you enter into website those 
//will be visible in cart ,sessions or tokens also provides personalized experiences to users by storing information 
//about users preferences,settings or past interactions (what he searched previously ,what theme did he choose all these are
//stored in sessions or tokens)  
//whenever we enter into a website(sends a login request) for example like a flipkart for the first time then first server checks from database
//if user is authenticated then request is granted also since it is first time server creates a file called session file
//in json format this file will also have a unique id called sessionid and it will be stored by the server in database
//and in terms of response server sends cookie to us ,now cookie is kind of a small file which contains sessionid 
//so next time suppose user wants to see coupon or profile page then he will also send the cookie (user sends a new request
//(with cookie)),this cookie contains session id so the server looks up in the database for the id found in cookie ,if 
//the id is found it sends the requested pages to user,so cookies generally contain information about users browser 
//activity that means what we have searched,interaction with website-where did we go on the website ,preferences 
//so along with session id the cookies contain the following above information 
//your browser automatically includes the cookie in the http requests it sends to website server 
//session cookies,persistent cookies 
//cookies storage -the cookies we receive from server are stored here but not mandatory that they are stored here only 
//local storage-some usefull information regarding the websites is stored locally in our browser example when i am visiting
//apple website then loading time may be less because all those pictures etc are stored in local storage ,session storage
//similar to local storage but its scope is limited to a particular browsing session 
//token based authentication 
//whenever user sends a login request the server authenticates the user by looking for username and password at database
//and server sends a token to the user(this token is stored in local storage) now when we again enter into the website then this token is also sent along http
//request ,now how is it verified-now we know that the token is actually made by using secret key so when it is sent to
//server ,it checks the key so the server validates the token using secret key so if its valid the user will be granted
//access to that particular web page so it is less strenious task whereas in cookies it used to check from database and
//and again database saying to server that session file is present or not by checking with sesion id 
//(tokens are also stored in cookies storage-doubt )
//here one thing dont forget that when server gives cookie to user containing session id currespondingly that session id
//is also stored in the database 
//JWT(json web token)-it is a specific type of token format and whenever it is transmitted it is transmitted in the form
//of json object ,JWTS are usefull for both authorization and authentication 
//statelessness-JWTS are stateless that means server nead not store the token info in database like session it just verifies
//tokens with the help of signature so this jwt has three parts header,payload and signature 
//header-the header part defines what cryptographic algorithm we use to create this token ,and type of token-jwt ,payload,and signature
//what we are creating by using secret key
//we know that some user info is stored inside token ,when user enters username and password the token generated obviously 
//must contain some info that server later fetches or decrypts and also we give some sort of payload through which it is 
//identified that token is from this user only 
//signature-verifies the integrity of token that its not tampered or expired,now this signature is created by encoding 
//header,payload,a secret key and applying specified algorithm to generate the signature,so whenever token is sent along
//the request it is verified by server using signature(using secret key which is generated during creation) 
//so we specify some unique thing about user in the payload which is used to identify the user
//see diagram and know that token will be stored at the browser itself
//in jwt we have two functions called jwt.sign() and jwt.verify() ,jwt.sign() function is used to create the token 
//so jwt.sign() creates a jwt token based on payload-a unique thing about user which is used to identify user,secret key
//and another is optional parameters -which might contain algorithm if you want to use your own algorithm instead of
//jwt and in optional parameters we also have expiresIn-which specifies the validity of token 
//we have jwt.verify() function which has parameters token and secret key 
// route /signup will create user,then he should get the token now it may be possible that user lost the token so for that
//we have to create the login page also (he will put username and password in that if its present in database he is 
//authenticated and then if he is authenticated he will receive a token),in our code the localauthmiddleware provides 
//protection at every route of person but in that case to access every route we need to specify username and password
//so here we dont want it to happen and we want it to happen through token 
//we want in signup route when person is created we want token to be sent from server 
//once the token has expiry date until that only token will be valid now so again we cannot tell the user to enter the 
//entire data (that means we cannot again create person) so we will have login page through which he will enter username
//and password and he will get the token 
//hence in this way with the help of token without any username or password we can access any protected routes 
