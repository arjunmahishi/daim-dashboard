import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';

// Comonents
import Home from "./components/home";
import Critical from "./components/critical";
import SOS from "./components/sos";

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/critical-list" component={Critical}/>
                <Route path="/sos" component={SOS}/>
            </div>
        </Router>
    );
  }
}

export default App;
