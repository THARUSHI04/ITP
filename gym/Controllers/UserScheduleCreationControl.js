// Updated UserScheduleCreationControl.js (add getByUserId function)
const UserScheduleCreation = require("../Model/UserScheduleCreationModel");

// GET all schedule creations (unchanged)
const getAllCreations = async (req, res, next) => {
  let creations;
  try {
    creations = await UserScheduleCreation.find();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }

  if (!creations || creations.length === 0) {
    return res.status(404).json({ message: "No user schedule creations found" });
  }

  return res.status(200).json({ creations });
};

// NEW: Get latest schedule creation by userId
const getByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let creation;

  try {
    creation = await UserScheduleCreation.findOne({ userId: userId }).sort({ createdAt: -1 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }

  if (!creation) {
    return res.status(404).json({ message: "No schedule creation found for this user" });
  }

  return res.status(200).json({ creation });
};

// GET by ID (unchanged)
const getByID = async (req, res, next) => {
  const id = req.params.id;
  let creation;

  try {
    creation = await UserScheduleCreation.findById(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }

  if (!creation) {
    return res.status(404).json({ message: "Schedule creation not found" });
  }

  return res.status(200).json({ creation });
};

// ADD new schedule creation (unchanged)
const addCreation = async (req, res, next) => {
  let creation;

  try {
    creation = new UserScheduleCreation({
      requestId: req.body.requestId,
      userId: req.body.userId,
      instructorId: req.body.instructorId,
      userName: req.body.userName,
      schedule: req.body.schedule,
      timeSlot: req.body.timeSlot
    });
    await creation.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to create schedule" });
  }

  return res.status(200).json({ creation });
};

// UPDATE creation by ID (unchanged)
const updateCreation = async (req, res, next) => {
  const id = req.params.id;
  const { requestId, userId, instructorId, userName, schedule, timeSlot } = req.body;

  let creation;
  try {
    creation = await UserScheduleCreation.findByIdAndUpdate(
      id,
      { requestId, userId, instructorId, userName, schedule, timeSlot },
      { new: true, runValidators: true }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to update schedule creation" });
  }

  if (!creation) {
    return res.status(404).json({ message: "Schedule creation not found" });
  }

  return res.status(200).json({ creation });
};

// DELETE creation by ID (unchanged)
const deleteCreation = async (req, res, next) => {
  const id = req.params.id;
  let creation;

  try {
    creation = await UserScheduleCreation.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to delete schedule creation" });
  }

  if (!creation) {
    return res.status(404).json({ message: "Schedule creation not found" });
  }

  return res.status(200).json({ creation });
};

module.exports = {
  getAllCreations,
  getByUserId,  // NEW: exported
  getByID,
  addCreation,
  updateCreation,
  deleteCreation
};






// const UserScheduleCreation = require("../Model/UserScheduleCreationModel");

// // GET all schedule creations
// const getAllCreations = async (req, res, next) => {
//   let creations;
//   try {
//     creations = await UserScheduleCreation.find();
//   } catch (err) {
//     console.log(err);
//   }

//   if (!creations) {
//     return res.status(404).json({ message: "No user schedule creations found" });
//   }

//   return res.status(200).json({ creations });
// };

// // Add new schedule creation
// const addCreation = async (req, res, next) => {
//   let creation;

//   try {
//     if (Array.isArray(req.body)) {
//       creation = await UserScheduleCreation.insertMany(
//         req.body.map(item => ({
//           userId: item.userId,
//           instructorId: item.instructorId,
//           userName: item.userName,
//           schedule: item.schedule,
//           timeSlot: item.timeSlot
//         }))
//       );
//     } else {
//       creation = new UserScheduleCreation({
//         userId: req.body.userId,
//         instructorId: req.body.instructorId,
//         userName: req.body.userName,
//         schedule: req.body.schedule,
//         timeSlot: req.body.timeSlot
//       });
//       await creation.save();
//     }
//   } catch (err) {
//     console.log(err);
//   }

//   if (!creation) {
//     return res.status(404).json({ message: "Unable to create schedule" });
//   }

//   return res.status(200).json({ creation });
// };

// // GET by ID
// const getByID = async (req, res, next) => {
//   const id = req.params.id;
//   let creation;

//   try {
//     creation = await UserScheduleCreation.findById(id);
//   } catch (err) {
//     console.log(err);
//   }

//   if (!creation) {
//     return res.status(404).json({ message: "Schedule creation not found" });
//   }

//   return res.status(200).json({ creation });
// };

// // UPDATE creation
// const updateCreation = async (req, res, next) => {
//   const id = req.params.id;
//   const { userId, instructorId, userName, schedule, timeSlot } = req.body;

//   let creation;
//   try {
//     creation = await UserScheduleCreation.findByIdAndUpdate(
//       id,
//       { userId, instructorId, userName, schedule, timeSlot },
//       { new: true, runValidators: true }
//     );
//   } catch (err) {
//     console.log(err);
//   }

//   if (!creation) {
//     return res.status(404).json({ message: "Unable to update schedule creation" });
//   }

//   return res.status(200).json({ creation });
// };

// // DELETE creation
// const deleteCreation = async (req, res, next) => {
//   const id = req.params.id;
//   let creation;

//   try {
//     creation = await UserScheduleCreation.findByIdAndDelete(id);
//   } catch (err) {
//     console.log(err);
//   }

//   if (!creation) {
//     return res.status(404).json({ message: "Unable to delete schedule creation" });
//   }

//   return res.status(200).json({ creation });
// };

// module.exports = {
//   getAllCreations,
//   addCreation,
//   getByID,
//   updateCreation,
//   deleteCreation
// };
