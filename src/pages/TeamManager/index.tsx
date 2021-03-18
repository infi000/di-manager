import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withStore from '@/store/withStore';
import styled from 'styled-components';
import BgWrap from '@/components/BgWrap';
import FormWrap from './components/FormWrap';
import TableList from './components/TableList';;
import CreateModal from './components/CreateModal';;
import CreateOrder from './components/CreateOrder';;
import PayInfo from './components/PayInfo';;
import { NAME_SPACE } from './constants';
import { IState, TAction } from './type';

const Wrap = styled.div`
  position:absolute;
  left:20%;
  right:20%;
  top:10%;
  background:#ffffffa3;
  box-shadow: 1px 5px 12px #7b7777;
`;

interface IProps extends IState, TAction { }
const TeamManager = (props: IProps) => {
  const { contentType, modalData, getQuestion } = props;
  useEffect(() => {
    getQuestion();
  },[])
  return <BgWrap>
    <div className='container'>
      <Wrap>
        {
          contentType === 'showPayInfo' && <PayInfo />
        }
        {
          contentType === 'createTeam' && <FormWrap />
        }
        {
          contentType === 'showTeam' && <TableList />
        }
        {
          contentType === 'createOrder' && <CreateOrder />
        }
        {
          modalData.show && <CreateModal />
        }
      </Wrap>
    </div>
  </BgWrap>
}

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(TeamManager);
