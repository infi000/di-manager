import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';


const Wrap = (props:any) => {
  const { checkLogin } = props;
  useEffect(() => {
    // 1. 判断是哪个用户，调用不同的借口。 这个先不做
    checkLogin();
  },[])
  return <>{props.children}</>;
}

const injectStore: [] = withStore('basic');
export default withRouter(connect(...injectStore)(Wrap));
