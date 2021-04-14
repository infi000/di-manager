import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withStore from '@/store/withStore';
import styled from 'styled-components';
import { NAME_SPACE } from './constants';
import { IState, TAction } from './type';
import CreateEditModal from './components/CreateEditModal';
import DataTable from './components/DataTable';

const Wrap = styled.div`
  padding:30px;
`;

interface IProps extends IState, TAction { }
const SignUpManager = (props: IProps) => {
  const { modalData } = props;
  useEffect(() => props.resetState, []);
  return (
    <Wrap>
      {modalData.show && <CreateEditModal />}
      <DataTable />
    </Wrap>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(SignUpManager);
