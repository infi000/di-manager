/* eslint-disable */
import React, { Component } from 'react';
import { Layout as AntLayout, Menu, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import withStore from '@/store/withStore';
import Loading from '@/pages/Loading';
import fetch from '@/utils/fetch';
import AvatarImg from './components/AvatarImg';
import styles from './Layout.scss';
import generateMenu from './utils/generateMenu';
import ErrorBoundary from '../components/ErrorBoundary';
import Help from './components/Help';

const { Header, Sider, Content, Footer } = AntLayout;
const { SubMenu, Item } = Menu;
const { Option } = Select;

const api = {
  // 获取head查询数据
  getMap: () => fetch('/ui/mc/getmerchantinfolistforchange', {}),
  // 切换商户
  getChangeStore: (params = {}) => fetch('/ui/mc/changemerchantidentity', { params }),
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
      openKeys: [`/${props.location.pathname.split('/')[1]}`], // 展开的菜单
      merchantInfoList: [],
      currentMerchantId: undefined,
    };
  }

  componentDidMount() {
    const { checkLogin, initDesensit } = this.props;
    this.getInfoList();
  }

  getInfoList = async () => {

  };

  onOpenChange = (openKeys) => {
    this.setState({ openKeys: openKeys.slice(-1) });
  };

  onSelect = ({ key }) => {
    this.setState({ openKeys: [`/${key.split('/')[1]}`] });
  };

  handleChange = async (value) => {
 
  };

  onCollapsedChange = () => {
    const { isCollapsed } = this.state;
    if (!isCollapsed) {
      this.setState({
        openKeys: [],
      });
    }
    this.setState({
      isCollapsed: !isCollapsed,
    });
  };

  render() {
    const { openKeys, isCollapsed, merchantInfoList, currentMerchantId } = this.state;
    const {
      powerInfo,
      userName,
      children,
      isLoading,
      location: { pathname },
    } = this.props;
    const menus = generateMenu(powerInfo);

    return (
      <AntLayout className={styles.basicLayout}>
        <Sider
          trigger={null}
          collapsible
          collapsed={isCollapsed}
          width={styles.siderWidth}
          className={styles.sider}
        >
          <NavLink to="/" className={isCollapsed ? styles.logoCollapsed : styles.logo} />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname]}
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
            onSelect={this.onSelect}
          >
            {menus.map(({ children: menuChildren, path, icon, name, auth = {} }) =>
              menuChildren && menuChildren.length ? (
                <SubMenu
                  key={path}
                  className={styles.subMenu}
                  title={
                    <>
                      <Icon type={icon} />
                      <span>{name}</span>
                    </>
                  }
                >
                  {menuChildren.map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ({ path: itemPath, name: itemName, auth: itemAuth = {} }) =>
                      (
                        <Item key={itemPath} className={styles.menu}>
                          <NavLink to={itemPath}>{itemName}</NavLink>
                        </Item>
                      ),
                  )}
                </SubMenu>
              ) : (
                  auth.view && (
                    <Item key={path} className={styles.menu}>
                      <NavLink to={path}>
                        <Icon type={icon} />
                        <span>{name}</span>
                      </NavLink>
                    </Item>
                  )
                ),
            )}
          </Menu>
        </Sider>
        <AntLayout>
          <Header className={isCollapsed ? styles.headerCollapsed : styles.header}>
            <Icon
              className={styles.trigger}
              type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.onCollapsedChange}
            />
            <div>
              <Select
                value={currentMerchantId}
                style={{ width: 160, marginRight: 10 }}
                onChange={this.handleChange}
                placeholder="请选择商户"
              >
                {merchantInfoList.map((item) => (
                  <Option key={item.merchant_id} value={item.merchant_id}>
                    {item.merchant_name}
                  </Option>
                ))}
              </Select>
              <AvatarImg />
              <span className={styles.user_name}>{userName}</span>
              <Help />
            </div>
          </Header>
          <Content className={isCollapsed ? styles.contentCollapsed : styles.content}>
            <ErrorBoundary>
              {isLoading ? <Loading /> : children}
            </ErrorBoundary>
          </Content>
        </AntLayout>
      </AntLayout>
    );
  }
}

export default withRouter(connect(...withStore('basic'))(Layout));
