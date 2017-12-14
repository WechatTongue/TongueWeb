import pathToRegexp from 'path-to-regexp';
import {queryCategory,deleteCategory,updateCategory,addCategory} from '../services/categoryService';

export default {
  namespace: 'category',
  state: {
    categories:[
      {
        id:1,
        nodeName:"寒",
        children:[{
          id:11,
          nodeName:"表寒"
        },{
          id:12,
          nodeName:"痰湿"
        }]
      },{
        id:2,
        nodeName:"热",
        children:[{
          id:21,
          nodeName:"湿热"
        },{
          id:22,
          nodeName:"内火"
        }]
      },{
        id:3,
        nodeName:"虚",
        children:[{
          id:31,
          nodeName:"气虚"
        },{
          id:32,
          nodeName:"血虚"
        }]
      },{
        id:4,
        nodeName:"实",
        children:[{
          id:41,
          nodeName:"血瘀"
        },{
          id:42,
          nodeName:"食滞"
        }]
      }
    ]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location)=>{
        console.log(location);
        const match= pathToRegexp('/category').exec(
          location.pathname
        );
        if(match){
          dispatch({
            type:'query',
            payload:{
            }
          })
        }
      })
    }
  },

  effects: {
    *query({payload},{call,put}){
      const data = yield call(queryCategory,{
        ...payload
      });
      console.log("data",data);
      if(data.ok){
        yield put({
          type:'update',
          payload:data.children
        })
      }
    },
    *delete({payload},{call,put}){
      const data = yield call(deleteCategory, {
        ...payload
      });
      if(data&&data.ok){
        yield put({
          type:"query",
        })
      }
    },
    *updateCategory({payload},{call,put}){
      const data = yield call(updateCategory, {
        ...payload
      });
      if(data&&data.ok){
        yield put({
          type:"query",
          payload:data
        })
      }
    },
    *add({payload},{call,put}){
      console.log("add",payload);
      const data = yield call(addCategory, {
        ...payload
      });
      if(data&&data.ok){
        yield put({
          type:"query",
          payload:data
        })
      }
    },
  },
  reducers: {
    update(state,action){
      return {categories:action.payload}
    },

  },
};

