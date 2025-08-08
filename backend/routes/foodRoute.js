import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter=express.Router();

//image storage engine
const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload=multer({storage:storage})

//foodRouter.post("/add",upload.single("image"),addFood)
// Correct POST route for "/api/food/add"
foodRouter.post("/food/add", upload.single("image"), addFood);
foodRouter.get("/food/list",listFood)
foodRouter.post("/food/remove",removeFood);


export default foodRouter;