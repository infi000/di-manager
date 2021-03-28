import React, { useMemo, useState } from 'react';
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
  const { modalData, postCreateBatch, postCreate } = props;
  const { validateFields, getFieldDecorator } = props.form;
  const [ch, setCh] = useState<string[]>(['']);
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
      if (!err) {
        const values = { ...val };
        if (modalData.type == 'create') {
          postCreateBatch({ p: [values] });
        }
        if (modalData.type == 'addItem') {
          values.pid = memoModalData.id;
          postCreate(values);
        }
      }
    })
  }
  /**
   * 添加ch长度
   */
  const handleAddCh = () => {
    setCh((arr: string[]) => {
      const _arr = [...arr];
      _arr.push('');
      return _arr;
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
        {
          modalData.type === 'create'
          && <Row>
            <Col span={24}>
              <Form.Item label='父标准描述'>
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '必填项' },],
                })(<Input />)}
              </Form.Item>
            </Col>
            {
              ch.map((_: string, index: number) => {
                return <>
                  <Col span={20} offset={4}>
                    <Form.Item label={`评分标准内容${index + 1}`}>
                      {getFieldDecorator(`ch[${index}].describe`, {
                        rules: [{ required: true, message: '必填项' },],
                      })(<Input />)}
                    </Form.Item>
                  </Col>
                  <Col span={20} offset={4}>
                    <Form.Item label={`评分最大分值${index + 1}`}>
                      {getFieldDecorator(`ch[${index}].maxscore`, {
                        rules: [{ required: true, message: '必填项' },],
                      })(<InputNumber />)}
                    </Form.Item>
                  </Col>
                </>
              })
            }
            <Col span={24}>
              <Form.Item label='新增子标准'>
                <Button onClick={handleAddCh}>添加</Button>
              </Form.Item>
            </Col>
          </Row>
        }
        {
          modalData.type === 'addItem'
          && <Row>
            <Col span={24}>
              <Form.Item label={`评分标准内容`}>
                {getFieldDecorator(`describe`, {
                  rules: [{ required: true, message: '必填项' },],
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={`评分最大分值`}>
                {getFieldDecorator(`maxscore`, {
                  rules: [{ required: true, message: '必填项' },],
                })(<InputNumber />)}
              </Form.Item>
            </Col>
          </Row>
        }
      </Form>
    </Modal>
  </div>
}

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)((Form.create<any>()(CreateEditModal)));
