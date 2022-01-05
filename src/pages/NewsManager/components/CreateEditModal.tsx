import React, { useMemo, useState } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Icon, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { NAME_SPACE } from '../constants';
import { IProps } from '../type';

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


const CreateEditModal = (props: IProps) => {
  const { modalData, postCreate, postModify } = props;
  const { validateFields, getFieldDecorator } = props.form;


  const memoModalData = useMemo(() => {
    const { data } = (modalData as any);
    return (data as any);
  }, [modalData]);

  /**
   * 取消
   */
  const handleCancel = () => {
    props.updateModalData({ data: {}, show: false });
  };
  /**
   * 新建/编辑
   */
  const handleOk = () => {
    validateFields((err, val) => {
      if (!err) {
        const value = { ...val };
        if (modalData.type == 'create') {
          postCreate(value);
        }
        if (modalData.type == 'edit') {
          postModify({ ...value, nid: (modalData as any).data.id });
        }
      }
    });
  };

  return (
    <div>
      <Modal
        style={{ top: '8%' }}
        width={800}
        visible={modalData.show}
        title={modalData.type === 'create' ? '新建' : '编辑'}
        onCancel={handleCancel}
        footer={(
          <Button className='cancel-button' onClick={handleOk}>
            提交
          </Button>
      )}
      >
        <Form className='sofa-modal-form' {...formItemLayout}>
          <Row>
            <Col span={24}>
              <Form.Item label='标题'>
                {getFieldDecorator('title', {
                  initialValue: memoModalData.title || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label='描述'>
                {getFieldDecorator('describe', {
                  initialValue: memoModalData.describe || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label='内容' style={{display:'none'}}>
                {getFieldDecorator('content', {
                  initialValue: '占位，用户不需要填写',
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

export default connect(...injectStore)((Form.create<any>()(CreateEditModal)));
