const User = require("../Model/UserModel");

const getAllUsers = async(req ,res ,next)=>{
    let users;

    try{
        users = await User.find();
    } catch(err){
        console.log(err);
    }

    //not found

    if(!users){
        return res.status(404).json({message:"User not found"});
    }

    //Display all users
    return res.status(200).json({users});

};


//Data Insert

const addUsers = async(req , res ,next) =>{
    const {userName, email,password ,contactNo,dob,gender,role, joinedDate, isApproved ,profileImage} = req.body;
    let users;

    try{
        users = new User({userName, email,password ,contactNo,dob,gender,role, joinedDate, isApproved ,profileImage});
        await users.save();
    }catch(err){
        console.log(err);
    }

    //users not getting inserted
    if(!users){
        return res.status(404).send({message:"Unable to add users"});
    }
    return res.status(200).json({users});

};


//Get by ID
const getById  = async (req , res ,next) => {

    const id = req.params.id;

    let users ;

    try{
        users = await User.findById(id);
    }catch(err){
        console.log(err);
    }
    
    //not available users
    if(!users){
        return res.status(404).json({message:"unable to find user "});
    }
    return res.status(200).json({users});
;}


//Update

const updateUser = async (req ,res ,next)=> {
    const id = req.params.id;
    const {userName, email,password ,contactNo,dob,gender,role, joinedDate, isApproved ,profileImage} = req.body;

    let users ;

    try{
        users = await User.findByIdAndUpdate(id,{userName: userName, email: email,password: password ,contactNo: contactNo,dob: dob,gender: gender,role: role, joinedDate: joinedDate, isApproved: isApproved ,profileImage: profileImage},{ new: true, runValidators: true  });
        // users = await users.save();
    }catch(err){
        console.log(err)
    }

    if(!users){
        return res.status(404).json({message:"unable to Update user details"});
    }
    return res.status(200).json({users});

}


//Delete User

const deleteUser = async (req , res, next)=>{
    const id = req.params.id;

    let users;

    try{
        users = await User.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }

    if(!users){
        return res.status(404).json({message:"unable to Delete user"});
    }
    return res.status(200).json({users});
}

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;