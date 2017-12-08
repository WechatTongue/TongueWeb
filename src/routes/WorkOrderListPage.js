import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { Link } from 'dva/router';

class WorkOrderListPage extends React.Component {

  renderWorkOrder(workOrderList){
    let cards=[];
    workOrderList.forEach((workOrder,index)=>{
      cards.push(
        <Link to={`/workOrder/${workOrder.workOrderId}`}>
        <Card title={workOrder.time}  style={{ width: 300, margin:20 }} key={index}>
          <p>{workOrder.description}</p>
        </Card>
        </Link>
      )
    });
    return cards;
  }

  render(){
    const { workOrderList } = this.props.workOrderList;
    return (
      <div>
        {this.renderWorkOrder(workOrderList)}
      </div>
    );
  }

}

function mapStateToProps({workOrderList}) {
  return {workOrderList};
}

export default connect(mapStateToProps)(WorkOrderListPage);
