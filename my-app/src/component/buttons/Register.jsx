import React from "react";
import Footer from "../Footer";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { variables } from './../../Variables'
import axios from 'axios';
import "./Register.css";

const Register = () => {
  const initialValues = {CustomerFName: "", CustomerSName: "", CustomerEmail: "", Password: "", CustomerAddr: "", PostalCode: "", CustomerPhone: "", CountryID: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [customerId, setCustomerId] = useState ("");
  const navigate = useNavigate();


  useEffect(() => {
    // Create a login for the customer when customerId is available
    if (customerId) {
      createLogin();
      navigate("/Login")
    }
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit
  
    // Check if any field is empty
    for (const key in formValues) {
      if (!formValues[key]) {
        alert(`Please fill out the ${key} field.`);
        return;
      }
    }
  
    // Check if passwords match
    if (formValues.Password !== formValues.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

      // Check if the email already exists
  try {
    const existingUserResponse = await axios.get(
      `${variables.LOGIN_API_URL}/${formValues.CustomerEmail}`
    );

    if (existingUserResponse.data) {
      alert("This email already exists. Please use a different email.");
      return;
    }
  } catch (error) {
    console.error("Error checking email:", error);
  }
  
    // Create a customer only if all fields are filled out and passwords match
    try {
      const customerData = {
        CustomerFName: formValues.CustomerFName,
        CustomerSName: formValues.CustomerSName,
        CustomerAddr: formValues.CustomerAddr,
        CustomerPhone: formValues.CustomerPhone,
        CustomerEmail: formValues.CustomerEmail,
        CountryID: formValues.CountryID,
        PostalCode: formValues.PostalCode,
      };
  
      const customerResponse = await axios.post(
        variables.CUSTOMER_API_URL, customerData
      );
  
    console.log("Customer created successfully:", customerResponse.data.customerID);
    
    setCustomerId(customerResponse.data.customerID);

    } catch (error) {
      console.error("Error creating customer", error);
      console.log("email: "+formValues.CustomerEmail+ "password: "+formValues.Password+ "customerid: "+customerId)
    }
  };

  const createLogin = async () => {
    try {
      const loginData = {
        Email: formValues.CustomerEmail,
        Password: formValues.Password,
        CustomerID: customerId,
      };
  
      const loginResponse = await axios.post(
        variables.LOGIN_API_URL,
        loginData
      );
  
      console.log("Login created successfully:", loginResponse.data);
      
    } catch (error) {
      console.error("Error creating login:", error);
      console.log("email: " + formValues.CustomerEmail + " password: " + formValues.Password + " customerId: " + customerId);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]:value});
    console.log("hej " +formValues.countryId);
}


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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="CustomerEmail">Email:</label>
            <input
              type="email"
              id="CustomerEmail"
              name="CustomerEmail"
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password:</label>
            <input
              type="password"
              id="Password"
              name="Password"
              className="form-control"
              required
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
                </select>
              </div>
              <input style={{borderRadius: "5px",}}
                type="number"
                id="CustomerPhone"
                name="CustomerPhone"
                className="form-control"
                placeholder="Enter phone number"
                required
                onChange={handleChange}
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
              onChange={handleChange}
            >
              <option value="">Select a country</option>
              <option value="61">Denmark</option>
              <option value="79">United Kingdom</option>
              <option value="107">India</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
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
