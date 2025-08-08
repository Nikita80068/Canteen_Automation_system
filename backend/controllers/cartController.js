// import userModel from '../models/userModel.js'
// import express from 'express';
// import { Router } from "express"



// // add items to user cart
// const addToCart=async(req,res)=>{
// try {
//     let userData=await userModel.findById(req.userId)
//     let cartData =await userData.cartData;
//     if(!cartData[req.itemId]){
//         cartData[req.itemId]=1
//     }
//     else{
//         cartData[req.itemId] += 1
//     }
//     await userModel.findByIdAndUpdate(req.userId,{cartData});
//     res.json({success:true,message:"Added to cart"});
// } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"error"})
// }
// }

// //remove items from user cart
// const removeFromCart = async(req, res)=>{
// try {
//     let userData=await userModel.findById(req.userId)
//     let cartData =await userData.cartData;
//     if(cartData[req.body.itemId]>0){
//         cartData[req.body.itemId] -= 1;
//     }
//     await userModel.findByIdAndUpdate(req.userId,{cartData});
//     res.json({success:true,message:"remove from cart"})
// } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"error"})
// }
// }

// // fetch user cart data
// const getCart=async(req,res)=>{
// try {
//     let userData=await userModel.findOne({_id:req.userId});
//     let cartData =await userData.cartData;
//     res.json({success:true,cartData})
    
// } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"error"})
// }
// }




// export {addToCart, removeFromCart, getCart}

import userModel from '../models/userModel.js'

// ✅ Add item to cart
const addToCart = async (req, res) => {
    try {
        const itemId = req.body.itemId;
        if (!itemId) return res.status(400).json({ success: false, message: "Item ID missing" });

        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.error("Add to cart error:", error);
        res.json({ success: false, message: "Error adding to cart" });
    }
}

// ✅ Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const itemId = req.body.itemId;
        if (!itemId) return res.status(400).json({ success: false, message: "Item ID missing" });

        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData || {};

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });

    } catch (error) {
        console.error("Remove from cart error:", error);
        res.json({ success: false, message: "Error removing from cart" });
    }
}

// ✅ Get cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });

    } catch (error) {
        console.error("Get cart error:", error);
        res.json({ success: false, message: "Error getting cart" });
    }
}

export { addToCart, removeFromCart, getCart };
