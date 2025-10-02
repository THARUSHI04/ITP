const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const Store = require("../Model/StoreModel");

// Add a product to favourites
router.post("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Optional: validate store item exists
    const storeItem = await Store.findById(productId);
    if (!storeItem) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!Array.isArray(user.favourites)) {
      user.favourites = [];
    }

    const alreadyFavourite = user.favourites.some(
      (id) => id.toString() === productId
    );

    if (!alreadyFavourite) {
      user.favourites.push(productId);
      await user.save();
    }

    return res.json({ message: "Added to favourites", favourites: user.favourites });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Remove a product from favourites
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!Array.isArray(user.favourites)) {
      user.favourites = [];
    }

    user.favourites = user.favourites.filter(
      (id) => id.toString() !== productId
    );
    await user.save();
    return res.json({ message: "Removed from favourites", favourites: user.favourites });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
