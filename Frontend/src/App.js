import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import useScrollToTop from './components/useScrollToTop';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Products from './components/Products';

function App() { 
  
  useScrollToTop();

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path="/:categoryName" element={<Products />} />
        <Route path="/category/:categoryName" element={<Products />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
