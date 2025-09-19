const Schedule = require("../Model/ScheduleModel");


////////////////////////////////////////////////////////////////////////////
// GET all schedules
const getAllSchedule = async (req, res, next) => {
    let schedules;
    try {
        schedules = await Schedule.find();
    } catch (err) {
        console.log(err);
    }

    //not found
    if (!schedules) {
        return res.status(404).json({ message: "Schedules not found" });
    }

    //display all users
    return res.status(200).json({ schedules });
};



////////////////////////////////////////////////////////////////////////////
//data Insert
const addScheduleRequest = async (req, res, next) => {
    let schedules;

    try {
        if (Array.isArray(req.body)) {
            // If the request body is an array → insert many schedules at once
            schedules = await Schedule.insertMany(
                req.body.map(item => ({
                    userName: item.UserName,  // map JSON "UserName" → schema "userName"
                    age: item.age,
                    contactNo: item.contactNo,
                    weight: item.weight,
                    height: item.height,
                    weeklyFrequence: item.weeklyFrequence,
                    specificType: item.specificType,
                    preferedExercise: item.preferedExercise
                }))
            );
        } else {
            // Single object insert
            schedules = new Schedule({
                userName: req.body.UserName,  // map JSON "UserName" → schema "userName"
                age: req.body.age,
                contactNo: req.body.contactNo,
                weight: req.body.weight,
                height: req.body.height,
                weeklyFrequence: req.body.weeklyFrequence,
                specificType: req.body.specificType,
                preferedExercise: req.body.preferedExercise
            });
            await schedules.save();
        }
    } catch (err) {
        console.log(err);
    }

    //not insert schedules
    if (!schedules) {
        return res.status(404).json({ message: "Unable to request Schedule" });
    }

    return res.status(200).json({ schedules });
};




////////////////////////////////////////////////////////////////////////////
//get by ID 
const getByID = async (req, res, next) => {
    const id = req.params.id;

    let schedule;

    try {
        schedule = await Schedule.findById(id);
    } catch (err) {
        console.log(err);
    }
    //not available schedules
    if (!schedule) {
        return res.status(404).json({ message: "Schedule Not Exist" });
    }
    return res.status(200).json({ schedule });
};




////////////////////////////////////////////////////////////////////////////
//Update Schedule detils
const updateSchdule = async (req, res, next) => {
    const id = req.params.id;

    //  fixed destructuring (no item.UserName here, only req.body)
    const {
        UserName,
        userName,
        age,
        contactNo,
        weight,
        height,
        weeklyFrequence,
        specificType,
        preferedExercise
    } = req.body;

    // pick correct field name for schema
    const finalUserName = userName ?? UserName;

    let schedules;

    try {
        schedules = await Schedule.findByIdAndUpdate(
            id,
            {
                userName: finalUserName,
                age,
                contactNo,
                weight,
                height,
                weeklyFrequence,
                specificType,
                preferedExercise
            },
            { new: true, runValidators: true } // return updated doc
        );
    } catch (err) {
        console.log(err);
    }

    if (!schedules) {
        return res.status(404).json({ message: "Unable to Update Schedule Details" });
    }
    return res.status(200).json({ schedules });
};





////////////////////////////////////////////////////////////////////////////
//Delete Schedule detils
const deleteSchdule = async (req, res, next) => {
    const id = req.params.id;

    let schedule;

    try{
        schedule = await Schedule.findByIdAndDelete(id)

    }catch(err){

        console.log(err);
    }
    if (!schedule) {
        return res.status(404).json({ message: "Unable to delete Schedule Details" });
    }
    return res.status(200).json({ schedule });


};




exports.getAllSchedule = getAllSchedule;
exports.addScheduleRequest = addScheduleRequest;
exports.getByID = getByID;
exports.updateSchdule = updateSchdule;
exports.deleteSchdule = deleteSchdule;



