import React, { useState } from "react";
import axios from "axios"; // Import Axios

const Login = () => {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.get("https://192.168.1.139:7001/api/Login")        
      .then(res =>{
        console.log(res.data);
    })

      console.log(email);
      // Handle the response from the server
      if (response.status === 200) {
        console.log("Login successful");
      } else {
        console.log("Login failed");
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
