import React from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
// import Search from './components/search/Search';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchResult from './pages/SearchResult';
import TransactionCompany from './pages/TransactionCompany';
import TransactionPerson from './pages/TransactionPerson';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        {/* <Search /> */}
        <Switch>
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
    </div>
  );
};

export default App;
