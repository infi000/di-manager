import React, { useMemo, useState } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Icon, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import { connect } from 'react-redux';
import { NAME_SPACE, FTYPE_MAP } from '../constants';
import { formatCreateParams } from '../adapter';
import { IProps } from '../type';
import { get, isEmpty } from 'lodash';

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
  const [ch, setCh] = useState<string[]>(() => {
    const { data } = (modalData as any);
    if (data && Array.isArray(data.jts) && data.jts.length > 0) {
      let res: string[] = [];
      (modalData as any).data.jts.forEach(() => {
        res.push('');
      });
      return res;
    } else {
      return ['']
    }
  });

  const memoModalData = useMemo(() => {
    const { data } = (modalData as any);
    if (!isEmpty(data)) {
      const formatJts = JSON.parse(data.judgedata);
      data.judgedata = formatJts;
    }
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
        const value = { ...val };
        if (modalData.type == 'create') {
          postCreate(formatCreateParams(value));
        }
        if (modalData.type == 'edit') {
          postModify({...formatCreateParams(value), id: (modalData as any).data.id });
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
        <Row>
          <Col span={24}>
            <Form.Item label='裁判类型'>
              {getFieldDecorator('jtype', {
                initialValue: memoModalData.jtype || '',
                rules: [{ required: true, message: '必填项' },],
              })(<Input />)}
            </Form.Item>
          </Col>
          {
            ch.map((_: string, index: number) => {
              return <>
                <Col span={20} offset={4}>
                  <Form.Item label={`评分标准id`}>
                    {getFieldDecorator(`jts[${index}].id`, {
                      initialValue: get(memoModalData, ['judgedata', index, 'id'], ''),
                      rules: [{ required: true, message: '必填项' },],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span={20} offset={4}>
                  <Form.Item label={`所属标准内容id`}>
                    {getFieldDecorator(`jts[${index}].chs`, {
                      initialValue: get(memoModalData, ['judgedata', index, 'chs'], ''),
                      rules: [{ required: true, message: '必填项' },],
                    })(<Input />)}
                  </Form.Item>
                </Col>
              </>
            })
          }
          <Col span={24}>
            <Form.Item label='新增'>
              <Button onClick={handleAddCh}>添加</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
}

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)((Form.create<any>()(CreateEditModal)));
