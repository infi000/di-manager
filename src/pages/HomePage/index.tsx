import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BgWrap from '@/components/BgWrap';
import { XUANCHUAN_URL } from '@/constants/index';
import { useHistory } from 'react-router-dom';
import withStore from '@/store/withStore';

const Wrap = styled.div`
  position:absolute;
  left:30%;
  right:30%;
  bottom:20%;
  display:flex;
  justify-content: center ;
`
const Btn = styled.div`
  width: 160px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #f15623;
  color: #fff;
  font-size: 18px;
  border-radius: 17px;
  font-weight: bold;
  cursor: pointer;
`
interface IProps extends IBasicState {}

const HomePage = (props:IProps) => {
  const { userInfo } = props;
  const history = useHistory();
  const handleSignUp = () => {
    switch (userInfo.utype) {
      case '1':
        break;
      case '2':
        history.push('/team');
        break;
      case '3':
        
        break;
      case '100':
        
        break;
      default:
        history.push('/login');
        break;
    }
  }
  return  <div className='container'>
      <Wrap>
        <Btn onClick={handleSignUp}>报名</Btn>
      </Wrap>
    </div>
}

const injectStore: [] = withStore('basic');
export default connect(...injectStore)(HomePage);