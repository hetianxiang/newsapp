import {get, getother} from './index';
export function fetchSliders(){
  return get('/sliders');
}
export function fetchNews(newsType, newsCount){
  return getother(`/Handler.ashx?action=getnews&type=${newsType}&count=${newsCount}`)
}