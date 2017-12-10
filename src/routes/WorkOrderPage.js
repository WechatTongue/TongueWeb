//单个WorkOrder
import React from 'react';
import { connect } from 'dva';
import { Timeline, Icon ,Select} from 'antd';
import { Cascader } from 'antd';

function handleChange(value) {
  console.log(`selected ${value}`);
}

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  disabled: true,
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

function getOptions(categories){
  let options = [];
  categories.forEach(function (category) {
    let children = [];
    if(category.children&&category.children!=null&&category.children.length!=0) {
      category.children.forEach(function (child) {
          children.push({
            value: child.id,
            label: child.nodeName
          });
        }
      );
    }
    options.push({
      value:category.id,
      label:category.nodeName,
      children:children
    });
    }
  );
  return options;
}
function onChange(value) {
  console.log(value);
}

class WorkOrderPage extends React.Component{

  renderPhotos(photos,categories){
    console.log("ball",categories)
    let that = this;

    if(photos==null||photos.length==0){
      return (<span/>)
    }
    let photoWall =[];
    photos.forEach((photo)=>{
      photoWall.push(
        <div>
          <img src = {photo.url} style={{marginRight: '10px',marginTop:'5px'}} key={photo.id} />
          <Cascader options={getOptions(categories)} onChange={onChange}/>
        </div>
      )
    });
    return photoWall;

  }

  renderWorkOrder({photos,description,time,categories}){
    return (
      <Timeline.Item dot={<Icon type="user" style={{fontSize: '16px'}}/>} color="blue"  key={1}>
        <div>
          <span color="blue">{time}</span><br/>
          {description}<br/>
          {this.renderPhotos(photos,categories)}
       </div>
     </Timeline.Item>
    )
  }

  renderInquiry(data,categories){
    return (
      <Timeline.Item dot={<Icon type="user" style={{fontSize: '16px'}}/>} color="blue"  key={data.sequenceId}>
        <div>
          <span color="blue">{data.time}</span><br/>
          {data.description}<br/>
          {this.renderPhotos(data.photos,categories)}
        </div>
      </Timeline.Item>
    )
  }

  renderDiagnostic(data){
    return (
      <Timeline.Item dot={<Icon type="medicine-box" style={{fontSize: '16px'}}/>} color="green" key={data.sequenceId}>
        {data.description}
      </Timeline.Item>
    )
  }

  renderSequence(sequences,categories){
    let chats =[];
    const that = this;
    sequences.forEach(function(data) {
      if(data.type=="inquiry"){
        chats.push(that.renderInquiry(data,categories))
      }else{
        chats.push(that.renderDiagnostic(data,categories))
      }
    });
    return chats;
  }

  render(){
    const { description, photos, time, sequences} =this.props.workOrder;
    const { categories } = this.props.category;

    return (
      <div style={{padding:'20px'}}>
        <Timeline>
          {this.renderWorkOrder({description,photos,time,categories})}
          {this.renderSequence(sequences,categories)}
        </Timeline>
    </div>
    );
  }
}

function mapStateToProps({workOrder,category}) {
  return {workOrder,category};
}

export default connect(mapStateToProps)(WorkOrderPage);
