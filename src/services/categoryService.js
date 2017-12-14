import request from '../utils/request';
import host from './hostConfig';

export async function addCategory(){
}


export async function deleteCategory(params){
  return request(`${host}/api/category/${params.id}`,{
    method : 'DELETE'
  });
}

export async function updateCategory(params){

  return request(`${host}/api/category?id=${params.id}&newName=${params.newName}`,{
    method : 'PUT'
  });
}

export async function add1Category(params){
  return {}
}

export async function add2Category(params){
  return {}
}

export async function queryCategory(){
  // return {
  //   ok:true,
  //   categories:[
  //     {
  //       id:1,
  //       nodeName:"寒",
  //       children:[{
  //         id:11,
  //         nodeName:"表寒",
  //       },{
  //         id:12,
  //         nodeName:"痰湿"
  //       }]
  //     },{
  //       id:2,
  //       nodeName:"热",
  //       children:[{
  //         id:21,
  //         nodeName:"湿热",
  //       },{
  //         id:22,
  //         nodeName:"内火"
  //       }]
  //     },{
  //       id:3,
  //       nodeName:"虚",
  //       children:[{
  //         id:31,
  //         nodeName:"气虚",
  //       },{
  //         id:32,
  //         nodeName:"血虚"
  //       }]
  //     },{
  //       id:4,
  //       nodeName:"实",
  //       children:[{
  //         id:41,
  //         nodeName:"血瘀",
  //       },{
  //         id:42,
  //         nodeName:"食滞"
  //       }]
  //     }
  //   ]
  // }
  return request(`${host}/api/category/1`);
}
