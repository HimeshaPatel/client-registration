const express = require("express");
const authControllers  = require("../controllers/auth-controllers");
const {signupSchema, loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware"); // Make sure this path is correct
const authMiddleWare = require("../middlewares/auth-middleware");

const router = express.Router();

router.route("/").get(authControllers.home);

router.route("/register").post( validate(signupSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);
router.route("/user").get(authMiddleWare, authControllers.user);

// router.get('/home', authMiddleWare, (req, res) => {
//     res.json({ message: "Welcome to the home page!", user: req.user });
// });

module.exports = router;