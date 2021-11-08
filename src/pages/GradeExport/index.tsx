import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withStore from '@/store/withStore';
import Path from '@/components/Path';
import { NAME_SPACE } from './constants';
import { IState, TAction } from './type';
import CreateEditModal from './components/CreateEditModal';
import DataTable from './components/DataTable';

interface IProps extends IState, TAction { }
const SignUpManager = (props: IProps) => {
  const { modalData } = props;
  useEffect(() => props.resetState, []);
  return (
    <div>
      <Path list={[{ name: '成绩导出' }]} />
      {modalData.show && <CreateEditModal />}
      <DataTable />
    </div>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(SignUpManager);
