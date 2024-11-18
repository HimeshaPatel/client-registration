
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Animated from './components/Animated';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import { useAuth } from './store/auth';

// import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/registration';

  return (
    <>
    <div className={`flex w-full h-screen ${isAuthPage ? 'lg:flex' : 'justify-center'}`}>
      <div className={`w-full ${isAuthPage ? 'lg:w-1/2 flex justify-center items-center' : ''}`}>
     
       {!isAuthPage && <Navbar />}
     <Routes>     
        <Route path="/" element={<Home />}  />
        <Route path="/home" element={<Home />} /> 
        <Route path="/registration" element={<Registration />} />
        
         
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        
     </Routes>
     
     </div>
     

    {isAuthPage &&<Animated />}


    </div>
    </>
  )
}

export default App
