import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withStore from '@/store/withStore';
import { NAME_SPACE } from './constants';
import { IState, TAction } from './type';
// import CreateEditModal from './components/CreateEditModal';
import DataTable from './components/DataTable';
import ModalBatchAdd from './components/ModalBatchAdd';

interface IProps extends IState, TAction { }
const GameTopicManager = (props: IProps) => {
  const { modalData } = props;
  useEffect(() => props.resetState, []);
  return (
    <div>
      {modalData.show && modalData.type == 'batchAdd' && <ModalBatchAdd />}
      <DataTable />
    </div>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(GameTopicManager);
