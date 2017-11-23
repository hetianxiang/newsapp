import React, { Component } from 'react';
import HomeHeader from './homeHeader/index';
import {connect} from 'react-redux';
import Slider from './slider/index';
import List from './newsList/index'
import actions from '../../store1/actions/home';
import './index.less'
class Home extends Component {
  componentDidMount(){
    this.props.getSliders()
    console.log(this.props)
  }
  state = {  }
  render() {
    return (  
      <div className="home">
        <HomeHeader
          setNews={this.props.setNews}
          news={this.props.lesson}/>
        <div className="main-content">
          <Slider sliders = {this.props.sliders}/>
          <List count={20} type="guoji" />
        </div>
      </div>
    );
  }
}

export default connect(
  state=>state.home,//{lesson:0}
  actions
)(Home)