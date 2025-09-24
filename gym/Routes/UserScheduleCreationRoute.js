const express = require("express");
const router = express.Router();

const UserScheduleCreationControl = require("../Controllers/UserScheduleCreationControl");

// CRUD routes
router.get("/", UserScheduleCreationControl.getAllCreations);
router.post("/", UserScheduleCreationControl.addCreation);
router.get("/:id", UserScheduleCreationControl.getByID);
router.put("/:id", UserScheduleCreationControl.updateCreation);
router.delete("/:id", UserScheduleCreationControl.deleteCreation);

module.exports = router;
