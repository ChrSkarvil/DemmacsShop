import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize user state

  // Function to update user data when logged in
  const loginUser = (userData) => {
    setUser(userData);
  };

  // Function to log the user out
  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
