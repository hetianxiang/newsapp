import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
import './index.less'

export default class List extends React.Component {
  constructor() {
    super();
    this.state = {
      news: '',
      count: 5,
      hasMore: 0,
      initializing: 1,
      refreshedAt: Date.now()
    };
  }
  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type
    + "&count=" + this.props.count, myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({news: json}));

  }
  componentWillUnmount(){ 
    //重写组件的setState方法，直接返回空
    this.setState = (state,callback)=>{
      return;
    };  
  }
  render() {
  const {news} = this.state;
  const newsList = news.length
  ?news.map((newsItem,index) => (
    <li key={index}>
        <Link to = {`detail/${newsItem.uniquekey}`} >  
        <img src={newsItem.thumbnail_pic_s} alt=""/>
        <div>
          <p className = "news-title">{newsItem.title}</p>
          <span>{newsItem.author_name}</span>
        </div>
        </Link>
    </li>
  ))
  :
  'noshujv'
    return (
    <div className ="newsList">
    {newsList}
    </div>
  )
  }
}