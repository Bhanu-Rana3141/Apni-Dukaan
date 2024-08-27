import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes, Route, Router } from 'react-router-dom';
import useScrollToTop from './components/useScrollToTop';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import HomePage from './components/HomePage';
import Footer from './components/Footer';

function App() {
  
  useScrollToTop();

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Register/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
