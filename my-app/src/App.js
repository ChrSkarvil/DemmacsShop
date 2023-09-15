import React from 'react';
import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from './component/buttons/Login';
import Register from './component/buttons/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;