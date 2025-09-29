const express = require("express");
const router = express.Router();

//Insert Model
const Store  =require("../Model/StoreModel");

//Inser User Controller
const StoreControllers = require("../Controllers/StoreControllers");

router.get("/", StoreControllers.getAllStore);
router.post("/", StoreControllers.addStore);
router.get("/:id", StoreControllers.getById);
router.put("/:id", StoreControllers.updateStore);
router.delete("/:id", StoreControllers.deleteStore);

//export
module.exports = router;