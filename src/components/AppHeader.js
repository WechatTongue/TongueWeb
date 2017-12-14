import React from 'react';
import { Link } from 'dva/router';
import { Menu, Dropdown } from 'antd';

class AppHeader extends React.Component{

  render (){

    const dropDownMenu = (
      <Menu>
        <Menu.Item key="1">
          <Link to={`/workOrderList`}>已回复</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={`/category`}>未回复</Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Menu
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Dropdown overlay={dropDownMenu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              问诊
            </a>
          </Dropdown>
        </Menu.Item>
        <Menu.Item key="2"><Link to={`/category`}>分类管理</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default AppHeader;
