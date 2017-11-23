import * as types from '../action-types';
import {signUp,login,validate} from '../../api/session';
import {push} from 'react-router-redux';
export default {
  signUp(data){
    return dispatch=>{
      signUp(data).then(payload=>{
        dispatch({
          type:types.SIGN_UP,
          payload
        })
        let {code} = payload;
        //当code为0的时候表示注册成功，则跳转到登录页
        if(code == 0)
            dispatch(push('/login'));
      });
    }
  },
  login(data){
    return dispatch=>{
      login(data).then(payload=>{
        dispatch({
          type:types.LOGIN,
          payload
        })
        let {code} = payload;
        //当code为0的时候表示登录成功，则跳转到个人中心页
        if(code == 0)
          dispatch(push('/profile'));
      });
    }
  },
  validate(){
    return dispatch => {
      validate().then(payload=>{
        dispatch({
          type:types.VALIDATE,
          payload
        })
      });
    }
  }
}