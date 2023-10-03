import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducer/authSlice';
import { useNavigate } from 'react-router-dom';



export default function Navbar() {
  const currentLocation = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.userRole);
  const cartItems = useSelector((state) => state.handleCart);
  const totalQuantity = cartItems.reduce((total, item) => total + item.qty, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  
    //clear userdata??
    
    navigate('/');
  };

  console.log("test"+ isLoggedIn)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm">
        <div className="container-fluid">
            <div className="pic">
                <img src="/assets/logoo.png" alt="logo" height="50px" width="50px"/>
            </div>
          <NavLink className="navbar-brand fw-bold fs-4" to="/" style={{marginLeft: "10px"}}>
            Demmacs
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/Products"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/About"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/Contact"
                >
                  Contact
                </NavLink>
              </li>
              {isLoggedIn && userRole === 'Admin' && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Adminpanel"
                  >
                    Admin
                  </NavLink>
                </li>
                <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/Userpanel"
                >
                  Userpanel
                </NavLink>
              </li>
              )}
            </ul>
            <div className="d-flex align-items-center">
            {isLoggedIn ? (
                // Render the "Logout" button if isLoggedIn is true
                <button className="btn btn-outline-dark me-2" onClick={handleLogout}>
                  <i className="fa fa-sign-out me-1"></i> Logout
                </button>
              ) : (
                // Render the "Login" and "Register" buttons if isLoggedIn is false
                <>
                  <NavLink to="/Login" className="btn btn-outline-dark me-2">
                    <i className="fa fa-sign-in me-1"></i> Login
                  </NavLink>
                  <NavLink to="/Register" className="btn btn-outline-dark me-2">
                    <i className="fa fa-user-plus me-1"></i> Register
                  </NavLink>
                </>
              )}
              <NavLink to="/Cart" className="btn btn-outline-dark">
                <i className="fa fa-shopping-cart me-1"></i> Cart ({totalQuantity})
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
