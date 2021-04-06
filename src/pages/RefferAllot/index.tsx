import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import withStore from '@/store/withStore';
import { NAME_SPACE } from './constants';
import { IState, TAction, IRefferItem } from './type';
// import CreateEditModal from './components/CreateEditModal';
import DataTable from './components/DataTable';
import ModalBatchAdd from './components/ModalBatchAdd';
import { serviceGetRefferList } from './services';

interface IProps extends IState, TAction { }
const GameTopicManager = (props: IProps) => {
  const [refferList, setRefferList] = useState<IRefferItem[]>([]);
  const { modalData } = props;
  useEffect(() => {
    serviceGetRefferList({
      offset: 0,
      count: 1000
    }).then(d => {
      setRefferList(d.users || []);
    });
  }, []);
  useEffect(() => props.resetState, []);
  return (
    <div>
      {modalData.show && <ModalBatchAdd list={refferList} />}
      <DataTable />
    </div>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(GameTopicManager);
