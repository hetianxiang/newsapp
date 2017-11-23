import * as types from '../action-types';
import { FETCH_LESSONS_REFRESH } from '../action-types';
import {fetchSliders, fetchNews} from '../../api/home';
export default {
  setNews(newsType){
    return {
      type:types.SET_NEWS,
      payload:{newsType}
    }
  },
  getSliders(){
    return dispatch => {
      fetchSliders().then(sliders => {
        dispatch({
          type:types.FETCH_SLIDERS,
          payload:{sliders}
        })
      })
    }
  }
}