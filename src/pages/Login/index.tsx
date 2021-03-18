import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStore from '@/store/withStore';
import styled from 'styled-components';
import BgWrap from '@/components/BgWrap';
import FormWrap from './components/FormWrap';
import { NAME_SPACE } from './constants';

const Wrap = styled.div`
  position:absolute;
  left:30%;
  right:30%;
  top:10%;
  background:#ffffffa3;
`

const Login = () => {
  return <BgWrap>
    <div className='container'>
      <Wrap>
        <FormWrap />
      </Wrap>
    </div>
  </BgWrap>
}

const injectStore: [] = withStore('basic', NAME_SPACE);

export default withRouter(connect(...injectStore)(Login));
