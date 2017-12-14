import React from 'react';
import { connect } from 'dva';
import { Card,Tabs,Layout } from 'antd';
import { Link } from 'dva/router';
import { formatTime } from '../utils/format';
import AppHeader from '../components/AppHeader';

const TabPane = Tabs.TabPane;

class WorkOrderListPage extends React.Component {

  renderWorkOrder(workOrderList,type){
    let cards=[];
    workOrderList.forEach((workOrder,index)=>{
      if(workOrder.lastChat==type) {
        cards.push(
          <Link to={`/workOrder/${workOrder.workOrderId}`}>
            <Card title={formatTime(workOrder.time)}  style={{width: 800, margin: 20}} key={index}>
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
      <Layout>
        <AppHeader/>
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="未回复" key="1">{this.renderWorkOrder(workOrderList,"patient")}</TabPane>
          <TabPane tab="已回复" key="2">{this.renderWorkOrder(workOrderList,"doctor")}</TabPane>
        </Tabs>
      </div>
      </Layout>
    );
  }

}

function mapStateToProps({workOrderList}) {
  return {workOrderList};
}

export default connect(mapStateToProps)(WorkOrderListPage);
