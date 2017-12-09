import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { Link } from 'dva/router';

class WorkOrderListPage extends React.Component {

  renderWorkOrder(workOrderList,type){
    let cards=[];
    workOrderList.forEach((workOrder,index)=>{
      if(workOrder.type==type) {
        cards.push(
          <Link to={`/workOrder/${workOrder.workOrderId}`}>
            <Card title={workOrder.time} style={{width: 800, margin: 20}} key={index}>
              <p>{workOrder.description}</p>
            </Card>
          </Link>
        )
      }
    });
    return cards;
  }

  render(){
    const { workOrderList } = this.props.workOrderList;
    return (
      <div>
        <ul id="myTab" class="nav nav-tabs">
          <li class="active"><a href="#replied" data-toggle="tab"> 未回复
          </a></li>
          <li><a href="#noreply" data-toggle="tab">已回复</a></li>
        </ul>
        <div id="myTabContent" class="tab-content">
          <div class="tab-pane fade in active" id="replied">
            <p>未回复</p>
            {this.renderWorkOrder(workOrderList,"noreply")}
          </div>
          <div class="tab-pane fade" id="noreply">
            <p>已回复</p>
            {this.renderWorkOrder(workOrderList,"replied")}
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps({workOrderList}) {
  return {workOrderList};
}

export default connect(mapStateToProps)(WorkOrderListPage);
