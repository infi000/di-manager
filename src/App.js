/* eslint-disable */
import React from 'react';
// localization
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
// store
import { Provider, connect } from 'react-redux';
import { StoreContext } from '@/utils/hooks';
import store from '@/config/store.conf';
// router
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
// base
import Layout from '@/basic/Layout';
import { routes, NotPower, blankRoutes } from '@/config/menu.conf';


const mapStateToProps = (state) => {
  const { basic } = state;
  return {
    ...basic,
  };
};

const ConnectedRoutes = withRouter(
  connect(mapStateToProps)((props) => {
    const { powerInfo = {} } = props;
    return (
      <>
        {routes.map(({ path, component }) => {
          return <Route exact key={path} path={path} component={component} />;
        })}
      </>
    );
  }),
);


// 不会验证权限和调用基础信息接口的白班路由
const BlankRoutes = (props) => {
  const { path, routesComponents } = props;
  return <div>
    {
      routesComponents.map((item) => <Route exact key={item.path} path={`${path + item.path}`} component={item.component} />)
    }
    {/* <Route path="*" exact component={NotPower}/> */}
  </div>;
};

// const ConnectedRoutes = withRouter(
//   connect()(BlankRoutes),
// );

const ConnectedRoutes2 = withRouter(
  connect(mapStateToProps)((props) => {
    return (
      <>
        {blankRoutes.map(({ path, component}) => {
          return <Route exact key={path} path={path} component={component} />;
        })}
      </>
    );
  }),
);
const App = () => (
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <StoreContext.Provider value={store}>
        <BrowserRouter>
          <Switch>
          <ConnectedRoutes2 />
            <Layout>
              <ConnectedRoutes />
            </Layout>
          </Switch>
        </BrowserRouter>
      </StoreContext.Provider>
    </Provider>
  </ConfigProvider>
);

export default App;


