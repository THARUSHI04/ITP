// src/Routes/ScheduleChangeRequestRoute.js
const express = require("express");
const router = express.Router();
const ScheduleChangeRequestControl = require("../Controllers/ScheduleChangeRequestControl");

router.get("/", ScheduleChangeRequestControl.getAllChangeRequests);
router.post("/", ScheduleChangeRequestControl.addChangeRequest);
router.delete("/:id", ScheduleChangeRequestControl.deleteChangeRequest);

module.exports = router;