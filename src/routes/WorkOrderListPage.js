import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { Link } from 'dva/router';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class WorkOrderListPage extends React.Component {

  renderWorkOrder(workOrderList,type){
    let cards=[];
    workOrderList.forEach((workOrder,index)=>{
      if(workOrder.lastChat==type) {
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
        <Tabs defaultActiveKey="1">
          <TabPane tab="未回复" key="1">{this.renderWorkOrder(workOrderList,"patient")}</TabPane>
          <TabPane tab="已回复" key="2">{this.renderWorkOrder(workOrderList,"doctor")}</TabPane>
        </Tabs>
      </div>
    );
  }

}

function mapStateToProps({workOrderList}) {
  return {workOrderList};
}

export default connect(mapStateToProps)(WorkOrderListPage);
