import pathToRegexp from 'path-to-regexp';
import { queryWorkOrderList } from '../services/messageService';

export default {
  namespace: 'workOrderList',
  state: {
    workOrderList:[
      {
        workOrderId:12345,
        time:'2017-06-30 15:22:33',
        description:"咳嗽咳咳咳咳咳咳咳咳"
      },{
        workOrderId:123456,
        time:'2017-08-20 16:20:33',
        description:"头晕脑胀胀胀胀胀胀胀胀胀胀胀胀胀胀胀胀"
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
          const openId = location.search.substring(8);
          dispatch({
            type:'queryWorkOrderList',
            payload:{
              openId:openId
            }
          })
        }
      })
    }
  },
  effects: {
    *queryWorkOrderList({payload},{call,put}){
      const data = call(queryWorkOrderList,{
        patientId:payload.patientId
      });
      if(data.ok){
        put({
          type:'update',
          payload:data
        })
      }
    }
  },
  reducers: {
    *update(state,action){
      return{
        ...state,
        ...action.payload
      }
    }
  },


};
