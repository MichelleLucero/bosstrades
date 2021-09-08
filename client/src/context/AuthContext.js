import React, { useState, createContext } from 'react';
import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (cred) => {
    try {
      const response = await api.post('/auth/', cred);
      localStorage.setItem('token', response.data.token);
      setAuthToken(localStorage.token);
      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
