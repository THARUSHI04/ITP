const Store = require("../Model/StoreModel");

// lightweight validators (image_URL and payment-related fields intentionally excluded)
function isNonEmptyString(value) {
	return typeof value === "string" && value.trim().length > 0;
}
function isPositiveNumber(value) {
	const n = Number(value);
	return Number.isFinite(n) && n > 0;
}
function isNonNegativeInteger(value) {
	const n = Number(value);
	return Number.isInteger(n) && n >= 0;
}

// List all store items
const getAllStore = async (req, res, next) => {
	try {
		const stores = await Store.find();
		return res.status(200).json(stores);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Failed to fetch stores" });
	}
};

// Create store item
const addStore = async(req, res, next) => {
	const { name, brand, image_URL, catogary, price, stock, discription } = req.body || {};

	// basic payload validation (exclude image_URL)
	const errors = [];
	if (!isNonEmptyString(name)) errors.push("name is required");
	if (!isNonEmptyString(brand)) errors.push("brand is required");
	if (!isNonEmptyString(catogary)) errors.push("catogary is required");
	if (!isPositiveNumber(price)) errors.push("price must be a positive number");
	if (!isNonNegativeInteger(stock)) errors.push("stock must be a non-negative integer");
	if (!isNonEmptyString(discription)) errors.push("discription is required");
	if (errors.length > 0) {
		return res.status(400).json({ message: "Validation failed", errors });
	}

	try{
		const store = new Store({
			name,
			brand,
			image_URL,
			catogary,
			price,
			stock,
			discription
		});
		await store.save();
		return res.status(201).json({ store });
	}catch (err){
		console.log(err);
		return res.status(500).json({ message: "Failed to add store" });
	}
};

// Get store item by id
const getById = async (req,res,next) => {
	const id = req.params.id;

	try{
		const store = await Store.findById(id);
		if(!store){
			return res.status(404).json({message: "Store not found"});
		}
		return res.status(200).json({store});
	}catch(err){
		console.log(err);
		return res.status(500).json({ message: "Failed to fetch store" });
	}
};

// Update store item
const updateStore = async(req, res, next) => {
	const id = req.params.id;
	const update = req.body || {};

	// validate only provided fields (exclude image_URL)
	const errors = [];
	if (update.name !== undefined && !isNonEmptyString(update.name)) errors.push("name must be a non-empty string");
	if (update.brand !== undefined && !isNonEmptyString(update.brand)) errors.push("brand must be a non-empty string");
	if (update.catogary !== undefined && !isNonEmptyString(update.catogary)) errors.push("catogary must be a non-empty string");
	if (update.price !== undefined && !isPositiveNumber(update.price)) errors.push("price must be a positive number");
	if (update.stock !== undefined && !isNonNegativeInteger(update.stock)) errors.push("stock must be a non-negative integer");
	if (update.discription !== undefined && !isNonEmptyString(update.discription)) errors.push("discription must be a non-empty string");
	if (errors.length > 0) {
		return res.status(400).json({ message: "Validation failed", errors });
	}

	try{
		const store = await Store.findByIdAndUpdate(
			id,
			update,
			{ new: true }
		);
		if(!store){
			return res.status(404).json({message: "Store not found"});
		}
		return res.status(200).json({store});
	}catch(err){
		console.log(err);
		return res.status(500).json({ message: "Failed to update store details" });
	}
};

// Delete store item
const deleteStore = async(req, res, next ) => {
	const id = req.params.id;

	try{
		const store = await Store.findByIdAndDelete(id);
		if(!store){
			return res.status(404).json({message: "Store not found"});
		}
		return res.status(200).json({store});
	}catch(err){
		console.log(err);
		return res.status(500).json({ message: "Failed to delete store" });
	}
};

exports.getAllStore = getAllStore;
exports.addStore = addStore;
exports.getById = getById;
exports.updateStore = updateStore;
exports.deleteStore = deleteStore;