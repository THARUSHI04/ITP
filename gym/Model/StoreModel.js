const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeShema = new Schema({
    name:{
        type:String , //dataType
        required:true , //validate
    },

    brand:{
        type:String, 
        required:true , 
    },

    image_URL:{
        type:String , 
        required:true , 
    },

    catogary:{
        type:String, 
        required:true , 
    },

    price:{
        type:Number, 
        required:true , 
    },
    stock:{
        type:Number, 
        required:true , 
    },

    discription:{
        type:String ,
        required:true , 
    },

    favourites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Store" } 
  ]

},
{ timestamps: true }); 

module.exports = mongoose.model(
    "Store", //file name
    storeShema //function name
)