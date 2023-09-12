import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadUser, loadDoctor } from './Actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import ProductPage from './components/ProductPage/ProductPage';
import AllProductsPage from './components/AllProductsPage/AllProductsPage';
import { getAllProducts } from './Actions/productActions';
import { getCartItems } from './Actions/productActions';
import MyPurchases from './components/MyPurchases/MyPurchases';
import Cart from './components/Cart/Cart';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector(state => state.user);

  let userId = "";
  if (user && user._id) {
    userId = user._id;
  }

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllProducts());

    if (userId) {
      dispatch(getCartItems(userId));
    }
  }, [dispatch, userId]);
  return loading==undefined|| loading==true?null :(
    <div className="App">

      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={isAuthenticated ? <Home /> : <Login />} />
          <Route path='/register' element={isAuthenticated ? <Home /> : <Register />} />
          <Route path='/allProducts' element={<AllProductsPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={isAuthenticated? <Cart/>:<Login/>}/>
          <Route path='/myPurchases' element={<MyPurchases/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  )
}

export default App;

/**
 * 
 * Categories Filter
 * Buy product page for each prod
 * Send userId of all those who have bought the prod to backend
 */