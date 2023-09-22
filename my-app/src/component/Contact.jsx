import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [problem, setProblem] = useState(''); // State for the selected problem
  const [errors, setErrors] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleProblemChange = (e) => {
    setProblem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = [];

    // Validate name
    if (!name) {
      newErrors.push('Please enter your name.');
    }

    // Validate email
    if (!isValidEmail(email)) {
      newErrors.push('Please enter a valid email address.');
    }

    // Validate problem selection
    if (!problem) {
      newErrors.push('Please choose a problem.');
    }

    // If there are errors, set them and don't proceed
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous errors
    setErrors([]);

    // Continue with sending the message
    console.log(`Name: ${name}, Email: ${email}, Problem: ${problem}, Message: ${message}`);
    setName('');
    setEmail('');
    setProblem('');
    setMessage('');
    alert('Your message has been sent!');
  };

  const isValidEmail = (email) => {
    // Simple email validation using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="container my-5 fs-4" style={{ maxWidth: '900px' }}>
      <h2 className="text-center">Contact Us</h2>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Your Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="problem" className="form-label">
            Choose Your Problem
          </label>
          <select
            className="form-select"
            id="problem"
            value={problem}
            onChange={handleProblemChange}
            required // This makes the selection required
          >
            <option value="" disabled>
              Select a problem
            </option>
            <option value="Option 1">Login issue</option>
            <option value="Option 2">Transaction issue</option>
            <option value="Option 3">Delivery issue</option>
            <option value="Option 3">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            rows="5"
            value={message}
            onChange={handleMessageChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
