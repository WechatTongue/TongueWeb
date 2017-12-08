//单个WorkOrder
import React from 'react';
import { connect } from 'dva';
import { Timeline, Icon } from 'antd';

class WorkOrderPage extends React.Component{

  renderPhotos(photos){

    if(photos==null||photos.length==0){
      return (<span/>)
    }
    let photoWall =[];
    photos.forEach((photo)=>{
      photoWall.push(
        <img src = {photo.url} style={{marginRight: '10px',marginTop:'5px'}} key={photo.id} />
      )
    });
    return photoWall;

  }

  renderWorkOrder({photos,description,time}){
    return (
      <Timeline.Item dot={<Icon type="user" style={{fontSize: '16px'}}/>} color="blue"  key={1}>
        <div>
          <span color="blue">{time}</span><br/>
          {description}<br/>
          {this.renderPhotos(photos)}
       </div>
     </Timeline.Item>
    )
  }

  renderInquiry(data){
    return (
      <Timeline.Item dot={<Icon type="user" style={{fontSize: '16px'}}/>} color="blue"  key={data.sequenceId}>
        <div>
          <span color="blue">{data.time}</span><br/>
          {data.description}<br/>
          {this.renderPhotos(data.photos)}
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

  renderSequence(sequences){
    let chats =[];
    const that = this;
    sequences.forEach(function(data) {
      if(data.type=="inquiry"){
        chats.push(that.renderInquiry(data))
      }else{
        chats.push(that.renderDiagnostic(data))
      }
    });
    return chats;
  }

  render(){
    const { description, photos, time, sequences} =this.props.workOrder;

    return (
      <div style={{padding:'20px'}}>
        <Timeline>
          {this.renderWorkOrder({description,photos,time})}
          {this.renderSequence(sequences)}
        </Timeline>
    </div>
    );
  }
}

function mapStateToProps({workOrder}) {
  return {workOrder};
}

export default connect(mapStateToProps)(WorkOrderPage);
