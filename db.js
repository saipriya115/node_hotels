//db.js is responsible for connection between database server and nodejs server through mongoose
const mongoose=require('mongoose')
//just like nodejs server runs at a specific port number similarily mongodbserver also has a port called _____
//define the mongodb connection url 
const mongourl='mongodb://localhost:27017/person'
//set up mongodb connection
mongoose.connect(mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})//mongodb always gets updated day by day hence for that we use usenewurl parameter
//mongoose defines a default connection object and that object is usefull for interaction with database connection
//mongoose mentains a default connection object representing the database connection
const db=mongoose.connection
//mongoose always mentains this db object so that it can get connected to database server
//by using this object only we establish bridge between node and mongodb 
//there are also event listeners which knows first if any event happens
//example we can define an eventlistener like this
db.on('connected',()=>{
    console.log("connected to server")
})//hence when connection is established event listener will know and it is printed 
db.on('disconnected',()=>{
    console.log(" not connected to server")
})
module.exports=db 

