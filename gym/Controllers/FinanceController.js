/*const Finance = require("./Models/FinanceModel");

const getAllUsers = async (req, res, next) => {
    let Users;

    try {
        Users = await Finance.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!Users || Users.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ users: Users });
};

exports.getAllUsers = getAllUsers;

// Data Display
const Finance = require("../Models/FinanceModel");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await Finance.find();
        // Always return 200, even if empty
        res.status(200).json({ users }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
    //data insert
      const addSubscriptionPlans = async(req,res,next)  =>{
        let users;
        try{
            users = new Finance({planName});
            await users.save();
        }catch(err){
            console.log(err);
        }
        //not insert data
        if(!users){
            return res.status(404).send({message:"unable to add plans"});

        }
        return res.status(200).json({users});

      };
    

exports.getAllUsers = getAllUsers;
exports.addSubscriptionPlans= addSubscriptionPlans;*/

const Finance = require("../Model/FinanceModel");

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await Finance.find();
    // Always return 200, even if empty
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add subscription plan
const addSubscriptionPlans = async (req, res, next) => {
  try {
    // Destructure values from request body
    const { planName, price,  durationMonths } = req.body;

    const plan = new Finance({
      planName,
      price,
      durationMonths,
    });

    await plan.save();

    return res.status(201).json({
      message: "Plan added successfully",
      plan,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add plan" });
  }
};

//Get by ID

const getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await Finance.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { planName, price, durationMonths } = req.body;

  try {
    // Correct Mongoose method
    const finance = await Finance.findByIdAndUpdate(
      id,
      { planName, price, durationMonths },
      { new: true } // return the updated document
    );

    if (!finance) {
      return res.status(404).json({ message: "Unable to update payment details" });
    }

    return res.status(200).json({ finance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//Delete User Data

const deleteUser = async (req,res,next)  =>{

     const id = req.params.id;
     let finance;
    try{
     finance = await  Finance.findByIdAndDelete(id)
    }catch(err){
       if (!finance) {
      return res.status(404).json({ message: "Unable to Delete payment details" });
    }

    return res.status(200).json({ finance });

    }
  

}


exports.getAllUsers = getAllUsers;
exports.addSubscriptionPlans = addSubscriptionPlans;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;




