import React, { useState, createContext } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (cred) => {
    try {
      const response = await api.post('/auth/', cred);

      localStorage.setItem('token', response.data.token);

      if (localStorage.token) {
        api.defaults.headers.common['x-auth-token'] = localStorage.token;
      } else {
        delete api.defaults.headers.common['x-auth-token'];
      }
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
