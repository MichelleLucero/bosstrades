import React, { useState, createContext } from 'react';
import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadUser = async (token) => {
    if (token === undefined && localStorage.token !== undefined) {
      token = localStorage.token;
    }

    localStorage.setItem('token', token);
    setAuthToken(localStorage.token);
    setIsAuthenticated(true);

    // allows to catch 400 errors
    api.get('/member/').catch((err) => {
      console.error(err);
      logout();
    });

    // try {
    //   const response = api.get('/member/');
    //   console.log(response);
    //   setIsAuthenticated(true);
    // } catch (err) {
    //   console.error(err);
    //   logout();
    // }
  };

  const login = async (cred) => {
    try {
      const response = await api.post('/auth/', cred);
      loadUser(response.data.token);
    } catch (err) {
      console.error(err);
      logout();
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

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        // setIsAuthenticated,
        login,
        register,
        loadUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
