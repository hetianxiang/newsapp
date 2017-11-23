import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './index.less'
class Tab extends Component {
  state = {  }
  render() {
    return (
      <div className="tabs">
        <NavLink to = "/" exact>
          <i className = "iconfont icon-brush_fill"></i>
          <span>首页</span>
        </NavLink>
        <NavLink to = "/market">
          <i className = "iconfont icon-browse"></i>
          <span>精彩</span>
        </NavLink>
        <NavLink to = "/mine">
          <i className = "iconfont icon-businesscard_fill"></i>
          <span>我的</span>
        </NavLink>
      </div>
    );
  }
}

export default Tab;