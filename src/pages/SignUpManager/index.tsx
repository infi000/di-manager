import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withStore from '@/store/withStore';
import { NAME_SPACE } from './constants';
import { IState, TAction } from './type';
import CreateEditModal from './components/CreateEditModal';
import PayTypeModal from './components/PayTypeModal';
import DataTable from './components/DataTable';
import InvoiceModal from './components/InvoiceModal';

interface IProps extends IState, TAction { }
const SignUpManager = (props: IProps) => {
  const { modalData, modalDataPayTYpe, modalDataInvoice } = props;
  useEffect(() => {
    return props.resetState;
  },[])
  return <div>
    {modalData.show && <CreateEditModal />}
    {modalDataPayTYpe.show && <PayTypeModal />}
    {modalDataInvoice.show && <InvoiceModal />}
    <DataTable />
  </div>
}

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(SignUpManager);
