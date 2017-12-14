import pathToRegexp from 'path-to-regexp';
import { queryWorkOrderList } from '../services/messageService';

export default {
  namespace: 'workOrderList',
  state: {
    workOrderList:[
      {
        workOrderId:12345,
        time:'2017-06-30 15:22:33',
        description:"咳嗽咳咳咳咳咳咳咳咳",
        lastChat:"doctor"
      },{
        workOrderId:123456,
        time:'2017-08-20 16:20:33',
        description:"头晕脑胀胀胀胀胀胀胀胀胀胀胀胀胀胀胀胀",
        lastChat:"patient"
      }
    ]
  },
  subscriptions: {
    setup({dispatch,history}){
      history.listen((location)=>{
        const match = pathToRegexp('/workOrderList').exec(
          location.pathname
        );
        if(match){
          dispatch({
            type:'queryWorkOrderList',
          })
        }
        const matchRoot = pathToRegexp('/').exec(
          location.pathname
        );
        if(matchRoot){
          dispatch({
            type:'queryWorkOrderList',
          })
        }
      })
    }
  },
  effects: {
    *queryWorkOrderList({payload},{call,put}){
      const data = yield call(queryWorkOrderList,{
        ...payload
      });
      if(data.ok){
        yield put({
          type:'update',
          payload:data
        })
      }
    }
  },
  reducers: {
    update(state,action){
      console.log("update state");
      return{
        workOrderList: action.payload
      }
    }
  },
};
