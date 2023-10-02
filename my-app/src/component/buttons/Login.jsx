import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs";
import { variables } from './../../Variables'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducer/authSlice'; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const h2 = {
    display: "flex",
    justifyContent: "center",
  };

  const formStyle = {
    width: "400px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
  };

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "10px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const buttonStyle = {
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "18px",
    cursor: "pointer",
    marginTop: "-10px",
  };

  const buttonStyle2 = {
    backgroundColor: "transparent",
    border: "transparent",
    fontSize: "18px",
    cursor: "pointer",
    marginLeft: "155px",
  };


  //Update email and password state on change
  const handleChange = (e) => {
    if (e.target.name === "Email") {
      setEmail(e.target.value);
    } else if (e.target.name === "Password") {
      setPassword(e.target.value);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      // Display an error message if email or password is empty
      setLoginError("Email and password are required.");
      return;
    }
  
    try {
      const response = await axios.get(
        `${variables.LOGIN_API_URL}/${email}`
      );
  
      const user = response.data;
      console.log(user);
  
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          // Passwords match, login successful
          // Save login data to context
          console.log("Login Successfully");
          const userData = { email: user.email, isLoggedIn: true, userRole: user.role };
          setUserRole(user.role);
          setLoggedIn(true); // Update login status
          setEmail(user.email);
          console.log("Role: " + userData.userRole);
          dispatch(login(userData)); // Dispatch the login action with user data
  
          // Redirect to home page
          navigate("/", { state: { userData } });
        } else {
          // Passwords do not match, login failed
          setLoginError("Invalid email or password");
          console.log("Login Failed");
        }
      } else {
        // The user doesn't exist
        setLoginError("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <div>
      <div style={containerStyle}>
        <div style={formStyle}>
          <h2 style={h2}>Login</h2>
          <form>
            <label style={labelStyle} htmlFor="Email">
              Email:
            </label>
            <input
              style={inputStyle}
              type="text"
              id="Email"
              name="Email"
              onChange={handleChange}
              required
            />
            <label style={labelStyle} htmlFor="Password">
              Password:
            </label>
            <input
              style={inputStyle}
              type="password"
              id="Password"
              name="Password"
              onChange={handleChange}
              required
            />
            <p
              style={{
                marginLeft: '192px',
                marginBottom: '-5px',
                marginTop: '-8px',
                paddingTop: '3px',
              }}
            >
              Don't have an account?
            </p>
            <button style={buttonStyle} type="button" onClick={handleLogin}>
              Login
            </button>

            {loginError && <p style={{ color: 'red', textAlign: 'center' }}>{loginError}</p>}

            <button style={buttonStyle2}>
              <a href="/Register">Sign up</a>
            </button>
            <div> <br /></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
