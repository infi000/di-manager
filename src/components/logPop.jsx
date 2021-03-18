// 日志弹窗
/*
入参：
1. dataList： [] 日志信息列表
2. visible: bool 显示隐藏
3. closeFunc: func 关闭执行的操作
*/
import React from 'react';
import { Modal, Table } from 'antd';
import moment from 'moment';

class LogPop extends React.Component {
  renderNull = (text) => ((text === null || !text) && text !== 0 ? '-' : text);
  columns = () => [
    {
      title: '操作时间',
      dataIndex: 'op_time',
      render: (text) => (text && moment.unix(text).format('YYYY-MM-DD HH:mm')) || '-',
      width: '40%',
    },
    {
      title: '操作人',
      dataIndex: 'op_user',
      render: this.renderNull,
      width: '20%',
    },
    {
      title: '操作',
      dataIndex: 'op_content',
      render: this.renderNull,
      width: '20%',
    },
    {
      title: '备注',
      dataIndex: 'op_remark',
      render: this.renderNull,
      width: '20%',
    },
  ];
  render() {
    const { visible, dataList, closeFunc } = this.props;
    // 商户信息
    return (
      <Modal title="日志详情" visible={visible} footer={null} destroyOnClose onCancel={closeFunc}>
        <Table
          dataSource={dataList}
          columns={this.columns()}
          rowKey={(item, ind) => ind}
          pagination={false}
          scroll={{ y: 270 }}
        />
      </Modal>
    );
  }
}

export default LogPop;
