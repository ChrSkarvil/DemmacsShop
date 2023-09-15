import React from 'react';
import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from './component/buttons/Login';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;