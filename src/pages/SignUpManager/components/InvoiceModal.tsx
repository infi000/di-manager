import React, { useMemo } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Descriptions, Form, Icon, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import { connect } from 'react-redux';
import { NAME_SPACE, IS_PAY } from '../constants';
// import { formatCreateParams, formatItem } from '../adapter';
import { IProps, ITableItem } from '../type';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const InvoiceModal = (props: IProps) => {
  const { modalDataInvoice, updateModalDataInvoice } = props;
  /**
   * 取消
   */
  const handleCancel = () => {
    updateModalDataInvoice({ data: {}, show: false });
  };

  return (
    <div>
      <Modal
        style={{ top: '8%' }}
        width={800}
        title='查看发票'
        onCancel={handleCancel}
        visible
      >
        <Descriptions>
          <Descriptions.Item label='公司名称'>{modalDataInvoice.data.company}</Descriptions.Item>
          <Descriptions.Item label='纳税人识别号'>{modalDataInvoice.data.companycode}</Descriptions.Item>
          <Descriptions.Item label='开票金额'>{modalDataInvoice.data.money}</Descriptions.Item>
          <Descriptions.Item label='开票项目'>{modalDataInvoice.data.billdetail}</Descriptions.Item>
          <Descriptions.Item label='增值税发票'>{modalDataInvoice.data.invoicetype}</Descriptions.Item>
          <Descriptions.Item label='发票种类'>{modalDataInvoice.data.billtype}</Descriptions.Item>
          <Descriptions.Item label='开户行名称'>{modalDataInvoice.data.bank}</Descriptions.Item>
          <Descriptions.Item label='开户行账号'>{modalDataInvoice.data.bankcard}</Descriptions.Item>
          <Descriptions.Item label='电子邮箱'>{modalDataInvoice.data.email}</Descriptions.Item>
          <Descriptions.Item label='邮寄地址'>{modalDataInvoice.data.address}</Descriptions.Item>
          <Descriptions.Item label='联系人'>{modalDataInvoice.data.uname}</Descriptions.Item>
          <Descriptions.Item label='公司联系电话'>{modalDataInvoice.data.phone}</Descriptions.Item>
        </Descriptions>,

      </Modal>
    </div>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)((Form.create<any>()(InvoiceModal)));
