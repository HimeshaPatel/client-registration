const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { sign } = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});







//    if (user.isModified("password")) {
//          return next();
//    }
//    try {
//     const saltRound = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(user.password, saltRound);
//     user.password = hashedPassword;
    
//    } catch (error) {
//     return next(error);
//    }
// });


//compare password

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();

   try {
      const saltRound = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, saltRound);
      next();
   } catch (error) {
      next(error);
   }
});


userSchema.methods.comparePassword = async function (password) {
    return  bcrypt.compare(password, this.password);
}

//json web token

userSchema.methods.generateToken = async function () {
    try {
    return jwt.sign(
      { 
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    } catch (error) {
        console.error("Token Error: ", error);
    }
}

const User = new mongoose.model("User", userSchema);

module.exports = User;