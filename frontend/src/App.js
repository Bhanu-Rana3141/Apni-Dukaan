import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginSignup from './components/LoginSignup.js';
import Home from './components/Home.js';

function App() {
  return (
    <>
      <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />
      <Routes>
        <Route path='/' element={<LoginSignup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </>
  );
}

export default App;
