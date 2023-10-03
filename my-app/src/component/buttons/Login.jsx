import React from "react";

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
            <button style={buttonStyle} type="button" >
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
