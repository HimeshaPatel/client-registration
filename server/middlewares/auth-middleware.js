// const jwt = require("jsonwebtoken");
// const User = require("../models/user-model");

// const authMiddleware = async (req, res, next) => {
//   const token = req.header("Authorization");
  


//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized HTTP, Token not provided" });
//   }

//   // Removing the "Bearer" prefix
//   const jwtToken = token.startsWith("Bearer ")
//     ? token.slice(7).trim() // Remove "Bearer " prefix
//     : token.trim(); 

  

//   try {
//     // Verifying the token
//     const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    
//     // Getting the complete user details without the password field
//     const userData = await User.findOne({ email: isVerified.email }).select({
//       password: 0,
//     });    

//     if (!userData) {
//       return res.status(401).json({ message: "Unauthorized. User not found." });
//     }

//     req.token = token;
//     req.user = userData;
//     req.userID = userData._id;

//     // Move on to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error("Token Verification Error:", error);

//     // Provide specific error messages
//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({ message: "Invalid token." });
//     } else if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token has expired." });
//     }


//     return res.status(401).json({ message: "Unauthorized. Invalid token." });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleWare = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  
  // Removing the "Bearer" prefix
  const jwtToken = token.replace("Bearer ", "").trim();
  console.log("Token from auth miiddleware:", jwtToken);


  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log("isVerified:", isVerified);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log("userData:", userData);
    
    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }


}

module.exports = authMiddleWare;