import React, { useState, createContext } from 'react';
import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loadUser = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(localStorage.token);
    setIsAuthenticated(true);
  };

  const login = async (cred) => {
    try {
      const response = await api.post('/auth/', cred);
      loadUser(response.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (cred) => {
    try {
      const response = await api.post('/member/', cred);
      loadUser(response.data.token);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, register }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
