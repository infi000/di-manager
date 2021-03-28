/* eslint-disable */
import React, { Component } from 'react';
import { Popover, Menu, Avatar } from 'antd';
import fetch from '@/utils/fetch';

const { Item } = Menu;

class AvatarImg extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  // 登出
  onLogout = () => {
    window.location.href = '/di/login';
  };



  renderUser = () => (
    <Menu style={{ border: '0px' }}>
      <Item key="logout" onClick={this.onLogout}>
        退出登陆
      </Item>
    </Menu>
  );
  render() {
    const { visible } = this.state;
    return (
      <Popover
        trigger="click"
        placement="topRight"
        arrowPointAtCenter
        visible={visible}
        onVisibleChange={(status) => this.setState({ visible: status })}
        getPopupContainer={(node) => node.parentNode}
        content={this.renderUser()}
      >
        <Avatar icon="user" style={{ cursor: 'pointer' }} />
      </Popover>
    );
  }
}

export default AvatarImg;
