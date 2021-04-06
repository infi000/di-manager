import React, { useMemo } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Icon, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import { connect } from 'react-redux';
import { NAME_SPACE } from '../constants';
// import { formatCreateParams, formatItem } from '../adapter';
import { IProps, ITableItem, IRefferItem } from '../type';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const PayTypeModal = (props: IProps & { list: IRefferItem[] }) => {
  const { list } = props;
  const { validateFields, getFieldDecorator } = props.form;
  /**
   * 取消
   */
  const handleCancel = () => {
    props.updateModalData({ show: false, data: { qid: '', jtid: '' } });
  };
  /**
   * 提交批量
   */
  const handleOk = () => {
    validateFields((err, val) => {
      if (!err) {
        const { uids } = val;
        const { modalData } = props;
        const { qid, jtid } = modalData.data;
        console.log({ uids, qid, jtid });
        props.postSetJudge({
          qid, jtid, uids: uids.join(',')
        });
      }
    });
  };
  return (
    <div>
      <Modal
        style={{ top: '8%' }}
        width={800}
        title='批量分配'
        onCancel={handleCancel}
        visible
        maskClosable={false}
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
                {getFieldDecorator('uids', {
                  rules: [{ required: true, message: '必填项' }],
                })(<Select allowClear mode='multiple'>
                  {
                    list.map(item => <Select.Option key={item.id} value={item.id}>{item.uname}</Select.Option>)
                  }
                </Select>)}
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
