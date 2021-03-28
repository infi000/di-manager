import React, { useMemo } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Icon, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import { connect } from 'react-redux';
import { NAME_SPACE, FTYPE_MAP } from '../constants';
// import { formatCreateParams, formatItem } from '../adapter';
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
    const { data } = modalData;
    return (data as any);
  }, [modalData]);

  /**
   * 取消
   */
  const handleCancel = () => {
    props.updateModalData({ data: {}, show: false })
  }
  /**
   * 新建/编辑
   */
  const handleOk = () => {
    validateFields((err, val) => {
      console.log(val);
      // return
      if (!err) {
        const values = { ...val };
        if (modalData.type == 'create') {
          postCreate(values);
        }

        console.log(modalData.type);
        if (modalData.type == 'edit') {
          postModify({ ...values, qfid: memoModalData.id });
        }
      }
    })
  }
  return <div>
    <Modal
      style={{ top: '8%' }}
      width={800}
      visible={modalData.show}
      title={modalData.type === 'create' ? '新建' : '编辑'}
      onCancel={handleCancel}
      footer={
        <Button className='cancel-button' onClick={handleOk}>
          提交
      </Button>
      }
    >
      <Form className='sofa-modal-form' {...formItemLayout}>
        <Row>
          <Col span={24}>
            <Form.Item label='标题'>
              {getFieldDecorator('title', {
                initialValue: memoModalData.title || '',
                rules: [{ required: true, message: '必填项' },],
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label='文件类型'>
              {getFieldDecorator('ftype', {
                initialValue: memoModalData.ftype || '',
                rules: [{ required: true, message: '必填项' },],
              })(<Select>
                {
                  Object.entries(FTYPE_MAP).map(item => {
                    const [value, label] = item;
                    return <Select.Option key={value} value={value}>{label}</Select.Option>
                  })
                }
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label='描述'>
              {getFieldDecorator('describe', {
                initialValue: memoModalData.describe || '',
                rules: [{ required: true, message: '必填项' },],
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
}

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)((Form.create<any>()(CreateEditModal)));
