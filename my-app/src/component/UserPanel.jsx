import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserPanel.css"; // You can style this separately

const UserPanel = () => {
  const [login, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    username: "",
    email: "",
    password: "",
    userType: "customer", // Default user type is "customer"
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://demmacs:5001/api/login"); // Update with your API endpoint
      const customersData = response.data;
      setCustomers(customersData);
    } catch (error) {
      console.error("Error fetching login:", error);
    }
  };

  const createCustomer = async () => {
    try {
      // Send the request to create a new customer
      const response = await axios.post("http://demmacs:5001/api/login", newCustomer); // Update with your API endpoint
      console.log("Customer created:", response.data);
  
      // Set the UserID based on the response
      setNewCustomer((prevCustomer) => ({
        ...prevCustomer,
        loginID: response.data.UserID, // Assuming the response structure has UserID
      }));
  
      // Fetch updated login
      fetchCustomers();
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("Error creating customer. Please check your data and try again.");
    }
  };

  const deleteCustomer = async (loginId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this customer?");
    if (shouldDelete) {
      try {
        await axios.delete(`http://demmacs:5001/api/Login/${loginId}`); // Update with your API endpoint
        console.log("Customer deleted:", loginId);
        fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setNewCustomer((prevCustomer) => ({
      ...prevCustomer,
      [field]: value,
    }));
  };

  return (
    <div className="customer-panel">
      <h1 className="mb-4">Customer Panel</h1>
      <div className="create-customer-form mb-4 mx-auto text-center">
        <h2 className="mb-3">Create New Customer</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Username"
            value={newCustomer.username}
            onChange={(e) => handleInputChange(e, "username")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={newCustomer.password}
            onChange={(e) => handleInputChange(e, "password")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userType">User Type:</label>
          <select
            id="userType"
            className="form-control"
            value={newCustomer.userType}
            onChange={(e) => handleInputChange(e, "userType")}
          >
            <option value="0">Customer</option>
            <option value="1">Employee</option>
          </select>
        </div>
        <button onClick={createCustomer} className="btn btn-primary">
          Create Customer
        </button>
      </div>

      <div className="customer-list">
        <h2 className="mb-4 text-center">Customer Logins</h2>
        <div className="customer-container">
          {login
            .filter((customer) => customer.userType === "customer") // Filter customers with userType "customer"
            .map((customer) => (
              <div className="customer-card" key={customer.loginID}>
                <div>
                  <p className="customer-email">Email: {customer.email}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCustomer(customer.loginID)}
                >
                  Delete Customer
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;