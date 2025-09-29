const Store = require("../Model/StoreModel");

//Data Display

const getAllStore = async (req, res, next) => {
    let store;

    //get all Store
    try{
        const store = await Store.find();
        res.json(store);
    }catch(err){
        console.log(err);
    }

    //not found
    if(!store){
        return req.status(404).json({message:"Store not found"});
    }
    //Display all Store
    return res.status(200).json({ store });
};

//Data Insert
const addStore = async(req, res, next) => {
    const{name,brand,image_URL,catogary,price,stock,discription} = req.body;

    let store;

    try{
        store = new Store({name,brand,image_URL,catogary,price,stock,discription});
        await store.save();
    }catch (err){
        console.log(err);
    }
    //not insert store

    if(!store){
        return res.status(404).json({message: " unable to add store" });
    }
    return res.status(200).json({store});

};

//Get by Id
const getById = async (req,res,next) => {

    const id = req.params.id;

    let store;

    try{
        store = await Store.findById(id);
    }catch(err){
        console.log(err);
    }
    //not available store

    if(!store){
        return res.status(404).json({message: " unable to add store" });
    }
    return res.status(200).json({store});


};


//Update User Details

const updateStore = async(req, res, next) => {
    const id = req.params.id;
    const{name,brand,image_URL,catogary,price,stock,discription} = req.body;

    let store;

    try{
        store = await Store.findByIdAndUpdate(id,
            { name : name,
              brand: brand,
              image_URL : image_URL ,
              catogary : catogary,
              price : price,
              stock : stock,
              discription : discription});
              store = await store.save();
    }catch(err){
        console.log(err);
    }
    if(!store){
        return res.status(404).json({message: " unable to update store details" });
    }
    return res.status(200).json({store});

};
//Delete Store Details

const deleteStore = async(req, res, next ) => {
    const id = req.params.id;

    let store;

    try{
        store = await Store.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!store){
        return res.status(404).json({message: " unable to delete store details" });
    }
    return res.status(200).json({store});
};


exports.getAllStore = getAllStore;
exports.addStore = addStore;
exports.getById = getById;
exports.updateStore = updateStore;
exports.deleteStore = deleteStore;