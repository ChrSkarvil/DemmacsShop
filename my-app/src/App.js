import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from './component/buttons/Login';
import Register from './component/buttons/Register';
import Cart from './component/buttons/Cart';
import Products from './component/Products';
import Product from './component/Product';
import About from './component/About';
import Contact from './component/Contact';
import Adminpanel from './component/Adminpanel';
import { useSelector } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import UserPanel from './component/UserPanel';


function App() {

  const userRole = useSelector((state) => state.auth.userRole);



  return (
    <Provider store={store}>
    <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Cart" element={<Cart hideFooter={true} />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Products/:id" element={<Product />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Adminpanel" element={userRole != "Admin" ? <Home/> : <Adminpanel/>} />
          <Route path="/Userpanel" element={userRole != "Admin" ? <Home/> : <UserPanel/>} />
          <Route path="*" element={<Home />} /> {/* Redirect to the home page for unmatched routes */}
        </Routes>
    </Router>
    </Provider>
  );
}

export default App;