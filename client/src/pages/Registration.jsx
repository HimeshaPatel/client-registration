import {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import CircleLoader  from "react-spinners/CircleLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#fff",
};



const Registration = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    })

    const [pageLoading, setPageLoading] = useState(true); // Separate state for page load
    const [submitLoading, setSubmitLoading] = useState(false); 

   const { showPassword, togglePasswordVisibility, isLoggedIn } = useAuth();

    const navigate = useNavigate();
   

    const {
        register,
        handleSubmit,
        watch,         
        formState: { errors },
    } = useForm();

    const username = watch("username");
    const email = watch("email");
    const phone = watch("phone");
    const password = watch("password");


    const handleInput = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
       
    }

    useEffect(() => {
    // Set a delay to simulate loading
        const loadPage = async () => {
            
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            setPageLoading(false); // Stop page loader
        };
        loadPage()
    localStorage.removeItem("token"); // Clear any existing token on registration page load
}, []);

    useEffect(() => {
        if (isLoggedIn) {
            console.log("User is logged in registration", isLoggedIn);
            navigate("/home"); 
        }
    }, [isLoggedIn,navigate]);

   


const onSubmit = async () => {
     setSubmitLoading(true);
    try {
        const response = await fetch(`http://localhost:5000/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const res_data = await response.json();
        console.log("res_data", res_data);
      
        if (response.ok) {            
            setUser({ username: "", email: "", phone: "", password: "" });
            toast.success("Registration Successful");
            navigate("/login");
        } else {
            // Display error messages if registration fails
            const errorMessage = res_data.extraDetails && res_data.extraDetails.length > 0 
                ? res_data.extraDetails.map((error, index) => `${index + 1}. ${error}`).join("\n") 
                : res_data.message || "Registration Failed";

            toast.error(
                <div>{errorMessage.split("\n").map((msg, i) => <div key={i}>{msg}</div>)}</div>
            );
        }

    } catch (error) {
        toast.error(error,"An unexpected error occurred. Please try again.");
    }finally{
        setSubmitLoading(false);
    }
};

if (pageLoading) {
        return (
            <div className=" inset-0 flex items-center justify-center bg-gray-100">
                <CircleLoader size={100} color={"#4f46e5"} loading={pageLoading} cssOverride={override} speedMultiplier={1} aria-label="Loading Spinner" role="status"  />
            </div>
        );
    }



    return (
        <>
            <section>
                <main>
                    <div className="section-registration w-[420px]" role="form">
                        <div className="text-center">
                            <h2 className="mt-10 text-center mb-4 text-2xl/9 font-bold tracking-tight text-gray-900">
                                Welcome
                            </h2>
                            <p className="font-medium text-md text-gray-500 mb-4">Please enter your details</p>
                        </div>
                        {/* our main registration code  */}
                        <div className="bg-white px-[25px] py-[30px] rounded-md drop-shadow-[0_6px_5px_rgba(0,0,0,0.05)] border-2 border-gray-100">


                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Registration form">
                                <div className="mt-4 text-left">
                                    <label htmlFor="username" className="block text-sm/6 font-medium mb-2 text-gray-900 capitalize">username</label>
                                    <input
                                        className="block w-full rounded-md border-0 p-[10px] py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 outline-none"
                                        type="text"
                                        {...register("username", { required: "Username is required",
                                             minLength: { value: 3, message: "Username must be at least 3 characters" },
                                             maxLength: {
                                            value: 255,
                                            message: "username cannot exceed 255 digits"
                                        } })}
                                        name="username"
                                        value={user.username}
                                        onChange={handleInput}
                                        placeholder="Enter your username"
                                        aria-required="true"
                                        aria-describedby="username-desc"
                                    />
                                    {(username && errors.username) && <p className="text-red-500 text-sm absolute">{errors.username.message}</p>}
                                </div>

                                <div className="mt-4 text-left">
                                    <label htmlFor="email" className="block text-sm/6 font-medium mb-2 text-gray-900 capitalize">email</label>
                                    <input
                                        className="block w-full rounded-md border-0 p-[10px] py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 outline-none"
                                        type="email"
                                        name="email"
                                        {...register("email", { 
                                        required: "Email is required", 
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address"
                                        }
                                    })}
                                        value={user.email}
                                        onChange={handleInput}
                                        placeholder="Enter your email"
                                        aria-required="true"
                                        aria-describedby="email-desc"
                                    />
                                    {(email && errors.email) && <p className="text-red-500 text-sm absolute">{errors.email.message}</p>}
                                </div>
                                <div className="mt-4 text-left">
                                    <label htmlFor="phone" className="block text-sm/6 font-medium mb-2 text-gray-900 capitalize">phone</label>
                                    <input
                                        className="block w-full rounded-md border-0 p-[10px] py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 outline-none"
                                        type="number"
                                        name="phone"
                                        {...register("phone", { 
                                        required: "Phone number is required", 
                                        minLength: {
                                            value: 10,
                                            message: "Phone number must be at least 10 digits"
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Phone number cannot exceed 20 digits"
                                        }
                                    })}
                                        value={user.phone}
                                        onChange={handleInput}
                                        placeholder="Enter your phone number"
                                        aria-required="true"
                                        aria-describedby="phone-desc"
                                    />
                                    {(phone && errors.phone) && <p className="text-red-500 text-sm absolute">{errors.phone.message}</p>}
                                </div>
                                <div className="mt-4 text-left relative">
                                    <label htmlFor="password" className="block text-sm/6 mb-2 font-medium text-gray-900 capitalize">password</label>
                                    <input
                                        className="block w-full rounded-md border-0 p-[10px] py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 outline-none"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        {...register("password", { required: "Password is required", minLength: { value: 7, message: "Password must be at least 7 characters" } })}
                                        value={user.password}
                                        onChange={handleInput}
                                        placeholder="Enter your password"
                                        aria-required="true"
                                        aria-describedby="password-desc"
                                    />
                                    {(password && errors.password) && <p className="text-red-500 text-sm absolute">{errors.password.message}</p>}
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                        onClick={togglePasswordVisibility}
                                        style={{ top: '73%', transform: 'translateY(-50%)' }}
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                    </button>
                                </div>
                                <div className="mt-8 flex">
                                   <button disabled={submitLoading} aria-label="Sign in" type="submit" className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    {submitLoading ? <ClipLoader color={"#ffffff"} loading={submitLoading} cssOverride={override} size={20} /> : "Sign in"}
                                </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </main>
            </section>
        </>
    )
}



export default Registration