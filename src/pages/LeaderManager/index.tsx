import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withStore from '@/store/withStore';
import { NAME_SPACE } from './constants';
import { IState, TAction } from './type';
import DataTable from './components/DataTable';

interface IProps extends IState, TAction { }
const GameTopicManager = (props: IProps) => {
  useEffect(() => props.resetState, []);
  return (
    <div>
      <DataTable />
    </div>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(GameTopicManager);
