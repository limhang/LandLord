import * as roomInfo from '../services/RoomInfo';
import storageTokenKey from '../constants.js';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'AllGamesInfo',
  state: {
  	AllGamesInfo: null,
  },
  reducers: {
    authSuccess(state, { payload: username }) {
      return { ...state, username };
    },
      authfail(state, { payload: username }) {
          return { ...state, username};
      },
  },
  effects: {
    *xxx({payload}, { call, put }) {
      console.log(payload);
      const {userName,client_id} = payload;
      yield call(roomInfo.test,{userName,client_id});
      // const {username, password} = payload;
      // const {data} = yield call(usersService.auth,{username,password});
      // if (data['code'] === 200) {
      //   const token = data['datas']['0']['token'];
      //   const username = data['datas']['0']['username'];
      //   window.localStorage.setItem(storageTokenKey, token);
      //   yield put({type:'authSuccess',payload:username});
      //   yield put(routerRedux.push('/postlist'));
      // } else {
      //     callback();
      //     // yield put({type:'authfail',payload:null});
      //     console.log('something wrong');
      //     // throw data;
      // }
     },

      *register({payload},{call,put}){
        const {username, password, repeat} = payload;
        const {data} = yield call(usersService.register,{username,password});
        if (data['code'] === 200) {
            console.log(data);
            const token = data['datas']['token'];
            const username = data['datas']['username'];
            window.localStorage.setItem(storageTokenKey, token);
            // yield put({type:'authSuccess',payload:username});
            yield put(routerRedux.push('/postlist'));
        } else {
            console.log('something wrong');
            yield put({type:'authfail',payload:null});
        }
      },
  },
  subscriptions: {

  },
};
