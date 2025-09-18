const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    userName: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    contactNo: {
        type: Number,
        required: true
    },


    weight: {
        type: String,
        required: true
    },

    height: {
        type: String,
        required: true
    },

    weeklyFrequence: {
        type: Number,
        required: true
    },

    specificType: {
        type: String,
        required: true
    },

    preferedExercise: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    "ScheduleModel", // model name
    scheduleSchema
);
