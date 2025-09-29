/*const routes = favourites.js
const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

// Add a product to favourites
router.post("/:userId/:productId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user.favourites.includes(req.params.productId)) {
      user.favourites.push(req.params.productId);
      await user.save();
    }
    res.json({ message: "Added to favourites", favourites: user.favourites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a product from favourites
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.favourites = user.favourites.filter(id => id.toString() !== req.params.productId);
    await user.save();
    res.json({ message: "Removed from favourites", favourites: user.favourites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;*/
