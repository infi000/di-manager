import React, { useMemo } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Icon, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import { connect } from 'react-redux';
import { AGE_TYPE_ARR } from '@/constants';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import { NAME_SPACE, DATE_FORMAT, ALIAS_MAP } from '../constants';
import { formatPostFile } from '../adapter';
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

const QTYPE_MAP = { 1: 'TC', 2: 'IC' };

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
    props.updateModalData({ data: {}, show: false });
  };
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
          postCreate(formatPostFile(values));
        }
        if (modalData.type == 'edit') {
          postModify(formatPostFile({ ...values, qid: memoModalData.id }));
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
              <Form.Item label='题目'>
                {getFieldDecorator('title', {
                  initialValue: memoModalData.title || '',
                  // rules: [{ required: true, message:'必填项' },],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='年龄组'>
                {getFieldDecorator('age', {
                  initialValue: memoModalData.age || '',
                  // rules: [{ required: true, message:'必填项' },],
                })(<Select>
                  {
                    AGE_TYPE_ARR.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)
                  }
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='选择挑战题'>
                {getFieldDecorator('alias', {
                  initialValue: memoModalData.alias || '',
                  // rules: [{ required: true, message:'必填项' },],
                })(<Select>
                  {
                    Object.entries(ALIAS_MAP).map((item) => {
                      const [value, label] = item;
                      return <Select.Option key={value} value={value}>{label}</Select.Option>;
                    })
                  }
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='挑战类型'>
                {getFieldDecorator('qtype', {
                  initialValue: memoModalData.qtype || '',
                  // rules: [{ required: true, message:'必填项' },],
                })(<Select>
                  {
                    Object.entries(QTYPE_MAP).map((item) => {
                      const [value, label] = item;
                      return <Select.Option key={value} value={value}>{label}</Select.Option>;
                    })
                  }
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='报名人数(最小人数)'>
                {getFieldDecorator('usermincount', {
                  initialValue: memoModalData.usermincount || '',
                  // rules: [{ required: true, message:'必填项' },],
                })(<InputNumber />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='报名人数(最大人数)'>
                {getFieldDecorator('usermaxcount', {
                  initialValue: memoModalData.usermaxcount || '',
                  // rules: [{ required: true, message:'必填项' },],
                })(<InputNumber />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='简述'>
                {getFieldDecorator('content', {
                  initialValue: memoModalData.content || '',
                  // rules: [{ required: true, message:'必填项' },],
                })(<Input />)}
              </Form.Item>
            </Col>
            {
              modalData.type == 'create' && (
              <Col span={24}>
                <Form.Item label='旅程指南文件'>
                  {getFieldDecorator('guide', {
                    initialValue: '',
                    // rules: [{ required: true, message:'必填项' },],
                  })(<AliyunOSSUpload />)}
                </Form.Item>
                <Form.Item label='挑战题文件'>
                  {getFieldDecorator('challenge', {
                    initialValue: '',
                    // rules: [{ required: true, message:'必填项' },],
                  })(<AliyunOSSUpload />)}
                </Form.Item>
                <Form.Item label='即时挑战训练册'>
                  {getFieldDecorator('trainbook', {
                    initialValue: '',
                    // rules: [{ required: true, message:'必填项' },],
                  })(<AliyunOSSUpload />)}
                </Form.Item>
              </Col>
              )
            }
            {
              modalData.type == 'edit' && (
              <Col span={24}>
                <Form.Item label='当前旅程指南文件地址'>
                  <a href={memoModalData.guidepath} target='_blank' referrerPolicy='no-referrer'>下载</a>
                </Form.Item>
                <Form.Item label='修改旅程指南文件'>
                  {getFieldDecorator('guide', {
                    // rules: [{ required: true, message:'必填项' },],
                  })(<AliyunOSSUpload />)}
                </Form.Item>
                <Form.Item label='当前挑战题文件地址'>
                  <a href={memoModalData.challengepath} target='_blank'>下载</a>
                </Form.Item>
                <Form.Item label='修改挑战题文件'>
                  {getFieldDecorator('challenge', {
                    initialValue: '',
                    // rules: [{ required: true, message:'必填项' },],
                  })(<AliyunOSSUpload />)}
                </Form.Item>
                <Form.Item label='当前即时挑战训练册文件地址'>
                  <a href={memoModalData.trainbookpath} target='_blank'>下载</a>
                </Form.Item>
                <Form.Item label='修改即时挑战训练册'>
                  {getFieldDecorator('trainbook', {
                    initialValue: '',
                    // rules: [{ required: true, message:'必填项' },],
                  })(<AliyunOSSUpload />)}
                </Form.Item>
              </Col>
              )
            }

          </Row>
        </Form>
      </Modal>
    </div>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)((Form.create<any>()(CreateEditModal)));
