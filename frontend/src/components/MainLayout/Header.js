import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import { Input } from 'antd';
const Search = Input.Search;
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

function Header({ location ,dispatch, }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/users">
        <Link to="/postlist"><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="/category">
        <Link to="/category"><Icon type="database" />Category</Link>
      </Menu.Item>
      <Menu.Item key="/tag">
        <Link to="/tag"><Icon type="tag" />Tag</Link>
      </Menu.Item>

      <Menu.Item key="/search">
        <Search
            placeholder="input search word"
            style={{ width: 200 }}
            onSearch={value => {
                dispatch(routerRedux.push({
                    pathname : '/postlist',
                    query: {kddetail:value,item:3},}))
            }}
        />
      </Menu.Item>

      <Menu.Item key="/exit">
        <Link to="/login"><Icon type="logout" />exit</Link>
      </Menu.Item>
    </Menu>
  );
}

export default connect()(Header);
