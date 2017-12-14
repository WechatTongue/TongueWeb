import React from 'react';
import { Link } from 'dva/router';
import { Menu } from 'antd';

class AppHeader extends React.Component{

  render (){

    return (
      <Menu
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Link to={`/workOrderList`}>
              问诊
          </Link>
        </Menu.Item>
        <Menu.Item key="2"><Link to={`/category`}>分类管理</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default AppHeader;
