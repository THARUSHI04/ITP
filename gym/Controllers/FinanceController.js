const Finance = require("../Model/FinanceModel");

// ✅ Get all plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await Finance.find();
    res.status(200).json(plans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add plan with enhanced validations
const addPlan = async (req, res) => {
  try {
    const {
      planName,
      price,
      durationMonths,
      description,
      currency,
      discount_percentage,
      final_price,
      access_level,
      features_included,
      status,
    } = req.body;

    // Required fields validation
    if (!planName || !price || !durationMonths) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Type & value validation
    if (typeof planName !== "string" || planName.trim().length < 3) {
      return res.status(400).json({ message: "Invalid plan name" });
    }
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }
    if (typeof durationMonths !== "number" || durationMonths <= 0) {
      return res.status(400).json({ message: "Duration must be greater than 0" });
    }

    if (discount_percentage && (typeof discount_percentage !== "number" || discount_percentage < 0 || discount_percentage > 100)) {
      return res.status(400).json({ message: "Discount must be between 0 and 100" });
    }

    if (final_price && (typeof final_price !== "number" || final_price < 0)) {
      return res.status(400).json({ message: "Final price must be a positive number" });
    }

    if (currency && typeof currency !== "string") {
      return res.status(400).json({ message: "Currency must be a string" });
    }

    if (access_level && typeof access_level !== "string") {
      return res.status(400).json({ message: "Access level must be a string" });
    }

    if (features_included && !Array.isArray(features_included)) {
      return res.status(400).json({ message: "Features must be an array" });
    }

    if (status && !["active", "inactive"].includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Status must be 'active' or 'inactive'" });
    }

    const plan = new Finance({
      planName,
      price,
      durationMonths,
      description,
      currency,
      discount_percentage,
      final_price,
      access_level,
      features_included,
      status,
    });

    await plan.save();
    res.status(201).json({ message: "Plan added successfully", plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to add plan" });
  }
};

// ✅ Get plan by ID
const getPlanById = async (req, res) => {
  try {
    const plan = await Finance.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update plan with enhanced validations
const updatePlan = async (req, res) => {
  try {
    const { planName, price, durationMonths, discount_percentage, final_price, status } = req.body;

    // Optional fields validation if provided
    if (planName && (typeof planName !== "string" || planName.trim().length < 3)) {
      return res.status(400).json({ message: "Invalid plan name" });
    }
    if (price && (typeof price !== "number" || price <= 0)) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }
    if (durationMonths && (typeof durationMonths !== "number" || durationMonths <= 0)) {
      return res.status(400).json({ message: "Duration must be greater than 0" });
    }
    if (discount_percentage && (typeof discount_percentage !== "number" || discount_percentage < 0 || discount_percentage > 100)) {
      return res.status(400).json({ message: "Discount must be between 0 and 100" });
    }
    if (final_price && (typeof final_price !== "number" || final_price < 0)) {
      return res.status(400).json({ message: "Final price must be a positive number" });
    }
    if (status && !["active", "inactive"].includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Status must be 'active' or 'inactive'" });
    }

    const updated = await Finance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Unable to update plan" });

    res.status(200).json({ message: "Plan updated successfully", plan: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete plan
const deletePlan = async (req, res) => {
  try {
    const plan = await Finance.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json({ message: "Plan deleted successfully", plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllPlans,
  addPlan,
  getPlanById,
  updatePlan,
  deletePlan,
};
