import React, { useMemo } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Icon, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import { connect } from 'react-redux';
import { NAME_SPACE } from '../constants';
// import { formatCreateParams, formatItem } from '../adapter';
import { IProps, ITableItem } from '../type';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

const PayTypeModal = (props: IProps) => {
  const { validateFields, getFieldDecorator } = props.form;
  /**
   * 取消
   */
  const handleCancel = () => {
    props.updateModalData({ data: { uids: '' }, show: false });
  };
  /**
   * 提交批量
   */
  const handleOk = () => {
    validateFields((err, val) => {
      if (!err) {
        const { sid } = val;
        const { modalData } = props;
        const { uids } = modalData.data;
        props.postBatch({
          uids, sid
        });
      }
    });
  };
  return (
    <div>
      <Modal
        style={{ top: '8%' }}
        width={400}
        title='批量分配'
        onCancel={handleCancel}
        visible
        footer={(
          <Button className='cancel-button' onClick={handleOk}>
            提交
          </Button>
      )}
      >
        <Form className='sofa-modal-form' {...formItemLayout}>
          <Row>
            <Col span={24}>
              <Form.Item label='输入分配到的比赛id'>
                {getFieldDecorator('sid', {
                  rules: [{ required: true, message: '必填项' }],
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)((Form.create<any>()(PayTypeModal)));
