// src/Controllers/ScheduleChangeRequestControl.js
const ScheduleChangeRequest = require("../Model/ScheduleChangeRequestModel");

// GET all change requests
const getAllChangeRequests = async (req, res, next) => {
  let requests;
  try {
    requests = await ScheduleChangeRequest.find();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }

  if (!requests || requests.length === 0) {
    return res.status(404).json({ message: "No change requests found" });
  }

  return res.status(200).json({ requests });
};

// ADD new change request
const addChangeRequest = async (req, res, next) => {
  let request;
  try {
    request = new ScheduleChangeRequest({
      scheduleId: req.body.scheduleId,
      userId: req.body.userId,
      userName: req.body.userName,
      changeDetails: req.body.changeDetails,
    });
    await request.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to create change request" });
  }

  return res.status(200).json({ request });
};

// DELETE change request by ID
const deleteChangeRequest = async (req, res, next) => {
  const id = req.params.id;
  let request;
  try {
    request = await ScheduleChangeRequest.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to delete change request" });
  }

  if (!request) {
    return res.status(404).json({ message: "Change request not found" });
  }

  return res.status(200).json({ request });
};

module.exports = {
  getAllChangeRequests,
  addChangeRequest,
  deleteChangeRequest,
};