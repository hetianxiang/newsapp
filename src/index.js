import React,{Component} from 'react';
import ReactDom from 'react-dom';
import App from "./container/App/index";
import store from './store1/index'
import {Provider} from 'react-redux';
ReactDom.render(
  <Provider store = {store}>
    <App/>
  </Provider>
, document.querySelector('#root'))