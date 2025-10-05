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

// ✅ Add plan
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

    if (!planName || !price || !durationMonths) {
      return res.status(400).json({ message: "Missing required fields" });
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

// ✅ Update plan
const updatePlan = async (req, res) => {
  try {
    const updated = await Finance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Unable to update plan" });
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
