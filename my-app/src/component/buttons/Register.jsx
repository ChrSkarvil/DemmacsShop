import React from "react";
import Footer from "../Footer";
import "./Register.css";

const Register = () => {
  return (
    <div>
      <br />
      <br />
      <div className="register-container">
        <h1 style={{ color: "black" }}>Register</h1>
        <form>
          <div className="form-group">
            <label htmlFor="CustomerFName">First Name:</label>
            <input
              type="text"
              id="CustomerFName"
              name="CustomerFName"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="CustomerSName">Last Name:</label>
            <input
              type="text"
              id="CustomerSName"
              name="CustomerSName"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="CustomerAddr">Address:</label>
            <input
              type="text"
              id="CustomerAddr"
              name="CustomerAddr"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="PostalCode">Postal Code:</label>
            <input
              type="number"
              id="PostalCode"
              name="PostalCode"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="CustomerPhone">Phone:</label>
            <div className="input-group">
              <div
                className="Selection"
                style={{ width: "35%", marginRight: "7px",}}
              >
                <select
                  id="PhoneCountryCode"
                  name="PhoneCountryCode"
                  className="form-select"
                  required
                >
                  <option value="+45">+45 (Denmark)</option>
                  <option value="+44">+44 (England)</option>
                  <option value="+91">+91 (India)</option>
                  {/* Add more country codes as needed */}
                </select>
              </div>
              <input style={{borderRadius: "5px",}}
                type="number"
                id="CustomerPhone"
                name="CustomerPhone"
                className="form-control"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="CountryID">Country:</label>
            <select
              id="CountryID"
              name="CountryID"
              className="form-control"
              required
            >
              <option value="">Select a country</option>
              <option value="1">Denmark</option>
              <option value="2">England</option>
              <option value="3">India</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Register;
