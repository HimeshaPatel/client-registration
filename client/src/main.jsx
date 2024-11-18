import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './store/auth.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
      <App />
      <ToastContainer position="top-right"
    autoClose={5000}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss 
    
    pauseOnHover
    theme="colored" />
    </BrowserRouter>
    </StrictMode>
  </AuthProvider>
  
);
