import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import WorkOrderListPage from './routes/WorkOrderListPage';
import WorkOrderPage from './routes/WorkOrderPage';
import CategoryPage from './routes/CategoryPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={WorkOrderListPage} />
        <Route path="/workOrderList" component={WorkOrderListPage} />
        <Route path="/workOrder" component={WorkOrderPage} />
        <Route path="/category" component={CategoryPage} />
      </Switch>
    </Router>
  );
}


export default RouterConfig;
