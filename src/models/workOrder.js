import pathToRegexp from 'path-to-regexp';
import {queryWorkOrder,addChat,updatePhotoCategory} from '../services/messageService';

export default {
  namespace: 'workOrder',
  state: {
    patientId:1,
    description:"",
    lastChat:"",  //病人的问诊
    photos:[{
      id:0,
      url:"",
    }],
    time:"",
    chats:[
      {
        workOrderId:1,
        patientId:1,
        sequenceId:1,
        description:"",
        type:"",
        photos:[{
          id:1,
          url:"",
          category:{}
        }],
        time:""
      }
    ]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location)=>{
        console.log(location);
        const match= pathToRegexp('/workOrder/:workOrderId').exec(
          location.pathname
        );
        if(match){
          const workOrderId = match[1];
          dispatch({
            type:'query',
            payload:{
              workOrderId:workOrderId
            }
          })
          dispatch({
            type:'category/query',
          })
        }
      })
    }
  },

  effects: {
    *query({payload},{call,put}){
      const data = yield call(queryWorkOrder,{
        ...payload
      });
      console.log("queryWorkOrder",data);
      if(data.ok){
        yield put({
          type:'update',
          payload:data
        })
      }
    },
    *addChat({payload},{call,put}){
      console.log("payload",payload);
      const data = yield call(addChat,{
        ...payload
      });
      console.log("dta",data);
      if(data.ok){
        yield put({
          type:'query',
          payload: {
            workOrderId: payload.workOrderId
          }
        })
      }
    },
    *updatePhotoCategory({payload},{call,put}){
      console.log("payload",payload);
      const data = yield call(updatePhotoCategory,{
        ...payload
      });
      console.log("dta",data);
      if(data.ok){
        yield put({
          type:'query',
          payload: {
            workOrderId: payload.workOrderId
          }
        })
      }
    },
  },
  reducers: {
    update(state,action){
      console.log("action",action);
      return {...state,...action.payload}
    }
  },
};
