import { useEffect, useState } from "react";
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
  borderColor: "white",
};


const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [pageLoading, setPageLoading] = useState(true); 
    const [submitLoading, setSubmitLoading] = useState(false); 

    const {storetokenInLS, showPassword, togglePasswordVisibility, isLoggedIn} = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,         
        formState: { errors },
    } = useForm();

    
    const email = watch("email");    
    const password = watch("password");

    useEffect(() => {
        if (isLoggedIn) {
            console.log("User is logged in", isLoggedIn);
            navigate("/home"); // Or wherever you want to redirect logged-in users
        }
    }, [isLoggedIn,navigate]);
    
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

     useEffect(() => {
        // Set a delay to simulate loading
        const loadPage = async () => {            
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            setPageLoading(false); // Stop page loader
        };
        loadPage();
        localStorage.removeItem("token"); // Clear any existing token on login page load
    }, []);

    const onSubmit = async () => {
       setSubmitLoading(true);
       
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log("login form", response);

            if (response.ok) {               
                const res_data = await response.json();
                storetokenInLS(res_data.token);
                setUser({
                    email: "",
                    password: "",
                });
                navigate("/home");
            }else{
                 toast.error("Invalid credentials. Please try again."); 
                console.log("Invalid Credentials");
            }

        } catch (error) {
           console.log("Login error:", error);
        toast.error("An unexpected error occurred. Please try again.");
        }finally {
             setSubmitLoading(false); // Stop button loader
        }

    }

    if (pageLoading) {
        return (
            <div className="z-50 inset-0 flex items-center justify-center bg-gray-100">                
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
                            <h2 id="login-heading" className="mt-10 text-center mb-4 text-2xl/9 font-bold tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>
                        {/* our main login code  */}
                        <div aria-labelledby="login-heading" className="bg-white px-[25px] py-[30px] rounded-md drop-shadow-[0_6px_5px_rgba(0,0,0,0.05)] border-2 border-gray-100">

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Login form">
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
                                    {(email && errors.email) && <p className="text-red-500 absolute text-sm">{errors.email.message}</p>}

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

                                <div className="mt-10 flex">
                                     <button disabled={submitLoading} aria-label="Sign in" type="submit" className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    {submitLoading ? <ClipLoader color={"#ffffff"} loading={submitLoading} cssOverride={override} size={20} /> : "Sign in"}
                                </button>
                                </div>
                            </form>


                        </div>

                        <p className="mt-10 text-center text-sm/6 text-gray-500 cursor-pointer">
                            Don't have an account? &nbsp;
                            <a href="/registration" aria-label="Create an account" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Create an account
                            </a>
                        </p>
                    </div>

                </main>
            </section>
        </>
    )
}

export default Login