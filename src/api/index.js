const host = 'http://localhost:3000';
const otherhost = 'http://newsapi.gugujiankong.com'
export function get(url){
  return fetch(host+url,{
    method: 'GET',
    credential:"include",
    headers:{
      "Accept":"application/json"
    }
  }).then(res => res.json());
}
export function getother(url){
  return fetch(otherhost+url, {
    method: 'GET'
  }).then(res => res.json());
}