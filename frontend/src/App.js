import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loading from './components/Loading.js';
import ScrollToTop from './components/ScrollToTop.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import LoginSignup from './components/LoginSignup.js';
import Home from './components/Home.js';
import Categories from './components/Categories.js';
// import ProtectedRoute from './components/ProtectedRoute.js';

function App() {

  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Showing loading indicator when navigating to a new page
    setLoading(true);
    const timer = setTimeout(() => {
        setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]); 

  ScrollToTop();

  return (
    <>
      <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />
      
      {loading && <Loading />}
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<LoginSignup/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
