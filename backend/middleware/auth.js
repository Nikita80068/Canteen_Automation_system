// import jwt from "jsonwebtoken"
// import { Router } from "express"

// const authMiddleware=async(req,res,next)=>{
// const {token} =req.headers;
// if(!token){
//     return res.json({success:false, message:"Not Authorizeed Login Again"})
// }
// try {
//     const token_decode=jwt.verify(token, process.env.JWT_SECRET);
//     req.userId=token_decode.id;
//     next();
// } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"error"})
// }
// }

// export default authMiddleware;


import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token; // safer and clearer
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authMiddleware;
