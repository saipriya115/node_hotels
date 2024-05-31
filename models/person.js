//we are using this file to define the model that is schema 
//by defining the schema mongoose will handle by itlself if anybody is typing the wrong name etc if anybody is typing number
//in string etc 
const mongoose= require('mongoose');
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
    }
    //email{
        //unique:true
    //}
})
//from the above schema we create the model 
const Person=mongoose.model("Person",personschema) 
module.exports=Person