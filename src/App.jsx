import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Order from './pages/Order';
import PrivateRoute from './routes/PrivateRoutes';
import MyOrder from './components/MyOrder';
import Footer from './components/Footer';


function App() {
  return (

      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar/>

        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/> } />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/my-orders" element={<MyOrder/>} />
            <Route path="/product/:id" element={<ProductDetail/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
  

            <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order/>
            </PrivateRoute>
          }
        />
          </Routes>
        </main>
<Footer/>
       
      </div>
 
  );
}

export default App;
