// import foodModel from "../models/foodModel.js";
// import multer from "multer";
// import fs from 'fs'


// // Add food item
// const addFood = async (req, res) => {
//   // Check if a file is uploaded
//   let image_filename =`${req.file.filename}`;
// console.log(image_filename);
//   // Create the food item
//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     category: req.body.category,
//     image: image_filename  // Store the filename of the uploaded image
//   });

//   try {
//     // Save the food item to the database
//     await food.save();
//     res.json({ success: true, message: "Food Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error"});
//   }
// };

// // Export multer upload middleware and addFood function




// // Import necessary modules
import foodModel from "../models/foodModel.js";
import multer from "multer";
import fs from 'fs';
import path from 'path';

// Setup Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/';

    // Check if folder exists, if not create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Keep original extension
  }
});

// Create upload middleware
const upload = multer({ storage: storage });

// Controller function to add food item
const addFood = async (req, res) => {
  try {
    // Check if file uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const image_filename = req.file.filename;
    console.log('Uploaded image filename:', image_filename);

    // Create the food item
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename  // Save filename only
    });

    // Save the food item to the database
    await food.save();
    res.status(201).json({ success: true, message: "Food Added" });

  } catch (error) {
    console.error('Error while adding food:', error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
 //all food list
 const listFood=async(req,res)=>{
  try {
    const foods=await foodModel.find({});
    res.json({success:true, data:foods})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"error"})
  }
 }

 //remove food items
 const removeFood=async(req,res)=>{
  try {
    const food=await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"error"})
  }
 }

 export { addFood, listFood, removeFood };

