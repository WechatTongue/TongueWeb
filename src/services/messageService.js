import request from '../utils/request';
import host from './hostConfig';

export async function addWorkOrder(params) {

  return {
    patientId:1,
    workOrderId:123,
    description:"医生帮我看看是啥毛病呗",
    type:"inquiry",  //病人的问诊
    photos:[{
      id:12345,
      url:"http://www.ufengtech.xyz/tongue/1.jpeg",
    },{
      id:12346,
      url:"http://www.ufengtech.xyz/tongue/2.jpeg"
    }],
    time:"2017-12-6 08:30"
  };

  // return request(`${host}/message/workorder`,{
  //   type : 'POST',
  //   data : {...params}
  // });
}

export async function addChat(params){
  return request(`${host}/message/chat`,{
    type : 'POST',
    data : {...params}
  });
}

export async function queryWorkOrder(params){

  console.log(params);

  // return {
  //   ok:true,
  //   patientId:1,
  //   description:"医生帮我看看是啥毛病呗",
  //   type:"inquiry",  //病人的问诊
  //   photos:[{
  //     id:12345,
  //     url:"http://img1.gtimg.com/dajia/pics/hv1/148/163/2231/145112488.jpg",
  //     category:{
  //       id:1,
  //       nodeName:"寒",
  //       children:{
  //         id:11,
  //         nodeName:"表寒"
  //       }
  //     }
  //   },{
  //     id:12346,
  //     url:"http://www.ufengtech.xyz/tongue/1.jpeg"
  //   }],
  //   time:"2017-12-6 08:30",
  //   sequences:[
  //     {
  //       workOrderId:1,
  //       patientId:1,
  //       sequenceId:2,
  //       description:"你这是表寒",
  //       type:"diagnostic",
  //       time:"2017-12-7 08:30"
  //     },{
  //       workOrderId:1,
  //       inquiryId:1,
  //       sequenceId:3,
  //       description:"医生我听不懂",
  //       type:"inquiry",
  //       time:"2017-12-7 09:30"
  //     },{
  //       workOrderId:1,
  //       patientId:1,
  //       sequenceId:4,
  //       description:"刚刚又拍了一张",
  //       type:"inquiry",
  //       photos:[{
  //         id:12347,
  //         url:"http://www.ufengtech.xyz/tongue/1.jpeg",
  //         category:{}
  //       }],
  //       time:"2017-12-6 15:30"
  //     }
  //   ]
  // }

  return request(`${host}/message/workorder/${params.workOrderId}`);
}

export async function queryWorkOrderList(params){
  return request(`${host}/message/workorders/docter`,{
    method : 'GET',
  });
}
