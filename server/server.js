require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute=require('./router/auth-router');
const connectDB = require("./utils/db");
const errorMiddleWare = require('./middlewares/error-middleware');


//cors

const corsOptions = {
  origin: "http://localhost:5173",
 methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
 credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth",authRoute);

app.use(errorMiddleWare);

const PORT = 5000;
connectDB().then(() => {
   app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
});

