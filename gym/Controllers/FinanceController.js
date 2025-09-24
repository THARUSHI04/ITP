const Finance = require("../Model/FinanceModel");

// ✅ Get all plans
const getAllPlans = async (req, res, next) => {
  try {
    const plans = await Finance.find();
    res.status(200).json(plans); // ✅ return array directly
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add a subscription plan
const addPlan = async (req, res, next) => {
  try {
    const { planName, price, durationMonths, description } = req.body;

    if (!planName || !price || !durationMonths) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const plan = new Finance({ planName, price, durationMonths, description });
    await plan.save();

    return res.status(201).json({ message: "Plan added successfully", plan });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add plan" });
  }
};

// ✅ Get plan by ID
const getPlanById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const plan = await Finance.findById(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    return res.status(200).json(plan); // ✅ return single object
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update plan
// ✅ Update plan
const updatePlan = async (req, res, next) => {
  const id = req.params.id;
  const { planName, price, durationMonths, description } = req.body;

  try {
    const plan = await Finance.findByIdAndUpdate(
      id,
      { planName, price, durationMonths, description },
      { new: true } // return updated doc
    );

    if (!plan) {
      return res.status(404).json({ message: "Unable to update plan" });
    }

    return res.status(200).json({ message: "Plan updated successfully", plan });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


// ✅ Delete plan
// FinanceController.js
const deletePlan = async (req, res, next) => {
  const id = req.params.id;
  try {
    const plan = await Finance.findByIdAndDelete(id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    return res.status(200).json({ message: "Plan deleted successfully", plan });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Export functions
exports.getAllPlans = getAllPlans;
exports.addPlan = addPlan;
exports.getPlanById = getPlanById;
exports.updatePlan = updatePlan;
exports.deletePlan = deletePlan;
