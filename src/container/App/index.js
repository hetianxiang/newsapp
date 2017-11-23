import React, { Component } from 'react';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom'
import './index.less'
import Cart from '../cart/index'
import Home from '../home/index'
import Market from '../market/index'
import Mine from '../mine/index'
import Tab from '../../components/tab/index'
class App extends Component {
  state = {  }
  render() {
    return (
      <Router>
        <div>
          <Route path = "/" exact component = {Home}/>
          <Route path = "/cart" component = {Cart}/>
          <Route path = "/market" component = {Market}/>
          <Route path = "/mine" component = {Mine}/>          
          <Tab/>
        </div>
      </Router>
    );
  }
}

export default App;