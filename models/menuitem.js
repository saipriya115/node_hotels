const mongoose=require('mongoose')
const menuitemschema=new mongoose.Schema({
    name:{
        type:String,
        requires:true,
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    }


})
const menuitem=mongoose.model('menuitem',menuitemschema)
module.exports=menuitem