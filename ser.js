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
 app.use('/menu',menuroutes)
 
 app.listen(3000,()=>{
  console.log("hello server")//tells us that server is alive
})//client requests through webbrowser and server responds to that request
//save() no longer expects a callback(like we used in post) beacause it decreases readability and increases complexity 
//and we know callback function is executed after the main function 
//async and await are usefull for database operations like for example it might take time for fetching persons data,we
//might have to wait until the persons data is fetched also it might take time to save persons data
//we have to wait until persons data is saved becaused we need to send response as well that persondata is saved or not
//that means we have to wait until some operations takes place-async and wait 

//now what if we want to get the persons data on get method 


 
 //here for everything we cannot make an end point like person/chef so we will use parametrized url 
 
 //express router is helpfull to modularize and organize your route handling code in node js application
 //update operation -put method 
 //id is used to identify any particular document 
 //crud operations
 //so to update first we need to find the document through unique id which is provided by 
 //mongodb  then we have to update it 
 //delete operation 
 
