const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


/* Home Logic */



const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to thapa technical Mern Series Updated router");
  } catch (error) {
    console.log(error);
  }
}

/* Register Logic */

const register = async (req, res) => {
  try {  

    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




/* Login Logic */


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      console.error("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);
    if (!isPasswordValid) {
      console.error("Password does not match");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await userExist.generateToken();
    res.status(200).json({
      message: "Login Successful",
      token,
      userId: userExist._id.toString(),
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


/* User Logic */

const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user; 
    console.log("userData", userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};



module.exports = {
    home,
    register,
    login,
    user
}