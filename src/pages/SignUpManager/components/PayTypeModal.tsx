import React, { useMemo } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Icon, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
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

const PayTypeModal = (props: IProps) => {
  const { validateFields, getFieldDecorator } = props.form;
  const { modalDataPayTYpe, postPayType } = props;
  /**
   * 取消
   */
  const handleCancel = () => {
    props.updateModalDataType({ data: '', show: false })
  }
  /**
   * 新建/编辑
   */
  const handleOk = () => {
    validateFields((err, val) => {
      if (!err) {
        const tid = modalDataPayTYpe.data;
        postPayType({ tid, ...val })
      }
    })
  }
  return <div>
    <Modal
      style={{ top: '8%' }}
      width={400}
      title='修改支付状态'
      onCancel={handleCancel}
      visible={true}
      footer={
        <Button className='cancel-button' onClick={handleOk}>
          提交
      </Button>
      }
    >
      <Form className='sofa-modal-form' {...formItemLayout}>
        <Row>
          <Col span={24}>
            <Form.Item label='支付状态'>
              {getFieldDecorator('ispay', {
                rules: [{ required: true, message: '必填项' },],
              })(<Select>
                {
                  Object.entries(IS_PAY).map(item => {
                    const [value, label] = item;
                    return <Select.Option key={value} value={value}>{label}</Select.Option>
                  })
                }
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
}

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)((Form.create<any>()(PayTypeModal)));
