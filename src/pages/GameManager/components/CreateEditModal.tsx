import React, { useMemo } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row } from 'antd';
import { connect } from 'react-redux';
import { NAME_SPACE, DATE_FORMAT } from '../constants';
import { formatCreateParams, formatItem } from '../adapter';
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


const CreateEditModal = (props: IProps) => {
  const { modalData, postCreate, postModify } = props;
  const { validateFields, getFieldDecorator } = props.form;

  const memoModalData = useMemo(() => {
    const { data } = modalData;
    return (formatItem(data) as ITableItem);
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
        const values = formatCreateParams(val);
        if (modalData.type == 'create') {
          postCreate(values);
        }
        if (modalData.type = 'edit') {
          postModify({ ...values, sid: memoModalData.id });
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
        title={modalData.type === 'create' ? '新建比赛' : '编辑比赛'}
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
              <Form.Item label='比赛标题'>
                {getFieldDecorator('title', {
                  initialValue: memoModalData.title || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='比赛描述'>
                {getFieldDecorator('describe', {
                  initialValue: memoModalData.describe || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='比赛地点'>
                {getFieldDecorator('address', {
                  initialValue: memoModalData.address || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<Input />)}
              </Form.Item>
            </Col>
            {/* <Col span={24}>
            <Form.Item label='报名人数(最小人数)'>
              {getFieldDecorator('usermincount', {
                initialValue: memoModalData.usermincount || '',
                rules: [{ required: true, message:'必填项' },],
              })(<InputNumber />)}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label='报名人数(最大人数)'>
              {getFieldDecorator('usermaxcount', {
                initialValue: memoModalData.usermaxcount || '',
                rules: [{ required: true, message:'必填项' },],
              })(<InputNumber />)}
            </Form.Item>
          </Col> */}
            <Col span={24}>
              <Form.Item label='比赛开始时间'>
                {getFieldDecorator('starttime', {
                  initialValue: memoModalData.starttime || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<DatePicker format={DATE_FORMAT} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='比赛结束时间'>
                {getFieldDecorator('endtime', {
                  initialValue: memoModalData.endtime || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<DatePicker format={DATE_FORMAT} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='注册开始时间'>
                {getFieldDecorator('regstarttime', {
                  initialValue: memoModalData.regstarttime || '',
                })(<DatePicker format={DATE_FORMAT} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='注册结束时间'>
                {getFieldDecorator('regendtime', {
                  initialValue: memoModalData.regendtime || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<DatePicker format={DATE_FORMAT} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='提交方案开始时间'>
                {getFieldDecorator('commitstarttime', {
                  initialValue: memoModalData.commitstarttime || '',
                })(<DatePicker format={DATE_FORMAT} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='提交方案结束时间'>
                {getFieldDecorator('commitendtime', {
                  initialValue: memoModalData.commitendtime || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<DatePicker format={DATE_FORMAT} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='评比开始时间'>
                {getFieldDecorator('evaluationstarttime', {
                  initialValue: memoModalData.evaluationstarttime || '',
                })(<DatePicker format={DATE_FORMAT} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='评比结束时间'>
                {getFieldDecorator('evaluationendtime', {
                  initialValue: memoModalData.evaluationendtime || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<DatePicker format={DATE_FORMAT} />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='成绩公布时间'>
                {getFieldDecorator('resulttime', {
                  initialValue: memoModalData.resulttime || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<DatePicker format={DATE_FORMAT} />)}
              </Form.Item>
            </Col>
            {/* <Col span={24}>
              <Form.Item label='报名费用'>
                {getFieldDecorator('money', {
                  initialValue: memoModalData.money || '',
                  rules: [{ required: true, message: '必填项' }],
                })(<InputNumber />)}
              </Form.Item>
            </Col> */}
            <Col span={24}>
              <Form.Item label='比赛公告模板'>
                {getFieldDecorator('model', {
                  initialValue: memoModalData.model || '',
                  // rules: [{ required: true, message:'必填项' },],
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
