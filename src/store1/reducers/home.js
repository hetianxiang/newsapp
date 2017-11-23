import * as types from '../action-types';
/**每个页面对应于一个reducer*/
let initState = {
  newsType : "",
  sliders:[],
}
export default function (state = initState, action) { 
  //每个action必须把携带的数据放在payload里，而且必须是一个对象。
  switch (action.type) {//判断动作的类型
    case types.SET_NEWS:
      return {
        ...state,
        newstype: action.payload.newsType
      }
    case types.FETCH_SLIDERS:
          return {
            ...state,
            sliders: action.payload.sliders
          }
    default:
      return state;
  }
}