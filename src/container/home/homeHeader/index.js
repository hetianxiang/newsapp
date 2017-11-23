import React, { Component } from 'react';
import logo from '../../../images/logo.png';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './index.less'
class HomeHeader extends Component {
  state = { isShow: false }
  getMenuList = () => (
  <CSSTransition
    timeout={1000}
    classNames="fade"
  >
    <ul 
    onClick = { event => {
      this.props.setNews(event.target.dataset.str); 
      this.setState({isShow:false})
    }}
    className="menu-list">
      <li className = {this.props.newsType == 'gj'?'active':''} data-str ="gj">国际新闻</li>
      <li className = {this.props.newsType == 'gn'?'active':''} data-str = "gn">国内新闻</li> 
      <li className = {this.props.newsType == 'ty'?'active':''} data-str = "ty">体育新闻</li>
      <li className = {this.props.newsType == 'yl'?'active':''} data-str = "yl">娱乐新闻</li>
    </ul>
  </CSSTransition>
  )
  render() {
    return (
      <div className="home-header">
        <div className="home-logo">
          <img src={logo}/>
          <span>{this.props.news}</span>
          <div onClick = {()=> this.setState({isShow:!this.state.isShow})}>
            {this.state.isShow 
            ?<i className="iconfont icon-close"/>
            : <i className="iconfont icon-other"/>}
          </div>
        </div>
        <TransitionGroup>
        {this.state.isShow? this.getMenuList(): null}
        </TransitionGroup>
      </div>
    );
  }
}

export default HomeHeader;