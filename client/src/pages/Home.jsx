
import { useAuth } from "../store/auth"
import { Navigate } from 'react-router-dom';

const Home = () => {
    const {user, isLoggedIn,  } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    
    

  return (
    <> 
    
  <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-5">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
                        Welcome, {user?.username}!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        We're excited to have you here. Explore your dashboard for personalized features and updates!
                    </p>
                   
                </div>
            </div>
        </div>

        </>

  )
}

export default Home