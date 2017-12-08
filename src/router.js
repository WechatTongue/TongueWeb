import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import WorkOrderListPage from './routes/WorkOrderListPage';
import WorkOrderPage from './routes/WorkOrderPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={WorkOrderListPage} />
        <Route path="/workOrderList" component={WorkOrderListPage} />
        <Route path="/workOrder" component={WorkOrderPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
