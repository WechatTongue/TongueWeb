import request from '../utils/request';
import host from './hostConfig';

export async function addChat(params){
  return request(`${host}/message/chat`,{
    method : 'POST',
    body : JSON.stringify({
      ...params
    })  });
}

export async function queryWorkOrder(params){
  return request(`${host}/message/workorder/${params.workOrderId}`);
}

export async function queryWorkOrderList(params){
  return request(`${host}/message/workorders/docter`,{
    method : 'GET',
  });
}
