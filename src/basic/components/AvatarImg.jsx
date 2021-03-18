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
  onLogout = ({ key }) => {
    this.setState({ visible: false });
    if (key !== 'logout') return;
    // 为什么还要掉一次下面的接口不是直接跳转到/pass/logout？
    // 因为后端需要我们主动清除一次之前调用/ui/mc/login注入的cookie
    // fetch('/ui/mc/clearlogincookie').then(() => {
    //   window.location.href = '/pass/logout';
    // }).catch(() => {
    //   window.location.href = '/pass/logout';
    // });
    window.location.href = '/pass/logout';
  };

  // 修改手机号
  changeTel = () => {
    window.location.href = '/pass/bindphone';
  };
  // 修改密码
  changePass = () => {
    window.location.href = '/pass/editpwd';
  };

  renderUser = () => (
    <Menu style={{ border: '0px' }}>
      <Item key="logout" onClick={this.onLogout}>
        退出登陆
      </Item>
      <Item key="m_tel" onClick={this.changeTel}>
        修改手机号
      </Item>
      <Item key="m_pass" onClick={this.changePass}>
        修改密码
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
