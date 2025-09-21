const express= require("express");
const router = express.Router();
//insert model
const User = require("../Model/UserModel");
//insert User Controller
const UserController = require("../Controllers/UserControllers");

router.get("/",UserController.getAllUsers);
router.post("/",UserController.addUsers);
router.get("/:id",UserController.getById);
router.put("/:id",UserController.updateUser);
router.delete("/:id",UserController.deleteUser);
router.post("/login", UserController.loginUser);

//export

module.exports = router;