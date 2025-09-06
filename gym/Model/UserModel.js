const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const userSchema = new Schema({

    userName :{
        type: String,//datatype
        required:true,//validate
    },

    email :{
        type: String,//datatype
        required:true,//validate
    },

    password :{
        type: String,//datatype
        required:true,//validate
    },

    contactNo :{
        type: String,//datatype
        required:true,//validate
    },

    dob :{
        type: Date,//datatype
        required:true,//validate
    },

    gender :{
        type: String,//datatype
        required:true,//validate
    },


    role :{
        type: String,//datatype
        required:true,//validate
    },

    joinedDate :{
        type: Date,//datatype
        required:true,//validate
    },

    isApproved: {
    type: Boolean,
    default: function () {
        // Auto-approve unless it's a gym
        return this.role !== "gym";
    }
    },

    profileImage :{
        type: String,//datatype
        required:true,//validate
    }

});

// Add auto-increment plugin for userId
// userSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model(
    "UserModel",//model file name
    userSchema //function name
)