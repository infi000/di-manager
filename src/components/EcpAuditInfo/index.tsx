import * as React from 'react';
import { Modal, Table } from 'antd';
import moment from 'moment';
import { useTableRenderNull } from '@/utils/hooks';

interface IProps {
    list: Array<{ [key: string]: any }>;
    handleCancel: () => void;
}

const ModalLog = (props: IProps) => {
  const { handleCancel, list } = props;

  const columns = useTableRenderNull([
    {
      title: '审批节点',
      dataIndex: 'task_name',
      key: 'task_name',
    },
    {
      title: '操作人',
      dataIndex: 'exe_user_id',
      key: 'exe_user_id',
    },
    {
      title: '操作时间',
      dataIndex: 'end_time',
      key: 'end_time',
      render: (text: string) => Number(text) !== 0 ? moment(Number(`${text}000`)).format('YYYY-MM-DD HH:mm:ss') : '-'
    },
  ], []);
  return (
    <Modal
      width='600px'
      title='ECP审批详情'
      visible
      onCancel={handleCancel}
      maskClosable
      footer={[]}
    >
      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
        rowKey=''
      />
    </Modal>
  );
};
export default ModalLog;
