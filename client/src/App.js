import React from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Search from './components/search/Search';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchResult from './pages/SearchResult';

const App = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <Router>
        <Switch>
          <Route path='/search?=:query' component={SearchResult} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
