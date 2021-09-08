import React from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
// import Search from './components/search/Search';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchResult from './pages/SearchResult';
import TransactionCompany from './pages/TransactionCompany';
import TransactionPerson from './pages/TransactionPerson';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        {/* <Search /> */}
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/search/:query' component={SearchResult} />
          <Route
            path='/transaction/company/:ticker'
            component={TransactionCompany}
          />
          <Route
            path='/transaction/person/:person_id'
            component={TransactionPerson}
          />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
