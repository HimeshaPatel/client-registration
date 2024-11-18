const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/client_registration";
// mongoose
//     .connect(URI)

const URI = process.env.MONGODB_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB not connected", error);
        process.exit(0);
    }
};

module.exports = connectDB;