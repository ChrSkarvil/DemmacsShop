import React from "react";
import Footer from "../Footer";

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
  };

  const buttonStyle2 = {
    backgroundColor: "lightwhite",
    border: "none",
    padding: "10px 20px",
    fontSize: "18px",
    cursor: "pointer",
    marginLeft: "173px",
    textDecoration: "none", 
  };
    //FFIX LOGIN KNAP OG SIGN UP FARVE OG DET OK  HEJ GOD WEEKEND TIL JER ALMIN OG CHRISNTAN?! :)))
  const p = {
    marginLeft: "192px",
  };

  return (
    <div>
      <div style={containerStyle}>
        <div style={formStyle}>
          <h2 style={h2}>Login</h2>
          <form action="login.php" method="post">
            <label style={labelStyle} htmlFor="Username">
              Username:
            </label>
            <input
              style={inputStyle}
              type="text"
              id="Username"
              name="Username"
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
            <button style={buttonStyle} type="submit">
              Login
            </button>
            <button style={buttonStyle2}>
              <a href="/Register">
                Sign up
              </a>
            </button>
          </form>
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default Login;
