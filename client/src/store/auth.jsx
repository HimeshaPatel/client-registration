
import {createContext, useContext, useEffect, useState} from "react";

// import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    // const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    
    ///  NEW IMPLEMENTATION //////

     useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    const storetokenInLS = (serverToken) => {
            setToken(serverToken);
            localStorage.setItem("token", serverToken);
    }


    let isLoggedIn = !!token;
    let isLoggedOut = !isLoggedIn;
    console.log("isLoggedIn",isLoggedIn);



    //logout functionality
    const LogoutUser = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
    }
        


     const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    
    //JWT Authentication - to get the current  logged in user data

    const useAunthication = async () => {
            if (!token) {
                return;
            }
            try {
                const response = await fetch("http://localhost:5000/api/auth/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setUser(data.userData);
         } 
            } catch (error) {
                console.log("Error fetching user data",error);
            }
    }


   useEffect(() => {
       
            
            useAunthication();
        
    }, [token]);
  
   
    return (
        <AuthContext.Provider value={{
        storetokenInLS, 
        showPassword,
        togglePasswordVisibility,
        token,
        setToken,       
        user,
       isLoggedOut,        
        LogoutUser,
        isLoggedIn,
        
        }}>
            {children}
        </AuthContext.Provider>
    )
}





export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
}