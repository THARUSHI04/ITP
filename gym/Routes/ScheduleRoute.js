const express = require("express");
const router = express.Router();



//insert model
const Schedule = require("../Model/ScheduleModel")
// insert Schedule Controller
const ScheduleControl = require("../Controllers/ScheduleControl");


// GET all schedules
router.get("/", ScheduleControl.getAllSchedule);
router.post("/", ScheduleControl.addScheduleRequest);
router.get("/:id", ScheduleControl.getByID);
router.put("/:id", ScheduleControl.updateSchdule);
router.delete("/:id", ScheduleControl.deleteSchdule);


//ecport
module.exports = router;
