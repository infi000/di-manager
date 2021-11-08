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
    const { checkLogin, getAreas, initDesensit } = this.props;
    checkLogin();
    getAreas();
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
    const { openKeys, isCollapsed } = this.state;
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
            />
            <div>
              <AvatarImg />
              <span className={styles.user_name}>{userName}</span>
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
