const {z} = require("zod");
const { login } = require("../controllers/auth-controllers");


const loginSchema = z.object({
     email: z
    .string({required_error: "email is required"})
    .trim()
    .email({message: "email must be a valid email address"})
    .min(3, {message: "email must be at least 3 characters"})
    .max(255, {message: "email must be less than 255 characters"}),

    password: z
    .string({required_error: "password is required"})
    .trim()
    .min(7, {message: "password must be at least 7 characters"})
    .max(1024, "Password must be less than 255 characters"),
});

const signupSchema = loginSchema.extend({
    username: z
    .string({required_error: "username is required"})
    .trim()
    .min(3, {message: "username must be at least 3 characters"})
    .max(255, {message: "username must be less than 255 characters"}),

   

    phone: z
    .string({required_error: "phone is required"})
    .trim()
    .min(10, {message: "phone must be at least 10 characters"})
    .max(20, {message: "phone must be less than 20 characters"}),

   
});




module.exports = {signupSchema, loginSchema};