import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import { NAME_SPACE, UTYPE_OPTION } from '../constants';
import FormButtonWrap from '@/components/FormButtonWrap';
import withStore from '@/store/withStore';
import { IState, TAction } from '../type';

interface IOutProps extends FormComponentProps {

}
interface IInProps extends IOutProps, TAction, IState {
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const CreateModal = (props: IInProps) => {
  const { postTeamMember, updateModalData, modalData } = props;
  const { getFieldDecorator, validateFields } = props.form;
  const handleOk = () => {
    validateFields((err, value) => {
      if (!err) {
        const val = { ...value };
        val.tid = modalData.data.id;
        postTeamMember(val);
      }
    })
  }
  const handleCancel = () => {
    updateModalData({ show: false, data: {} })
  }

  return (
    <Modal
      title='编辑队员'
      destroyOnClose
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={400}
    >
      <Form {...formItemLayout}>
        <Form.Item label="姓名">
          {getFieldDecorator('realname', {
            rules: [
              {
                required: true,
                message: '输入姓名',
              },
            ],
          })(<Input size='small' />)}
        </Form.Item>
        <Form.Item label="手机">
          {getFieldDecorator('uphone', {
            rules: [
              {
                required: true,
                message: '输入手机',
              },
            ],
          })(<Input size='small' />)}
        </Form.Item>
        <Form.Item label="年龄">
          {getFieldDecorator('age', {
            rules: [
              {
                required: true,
                message: '输入年龄',
              },
            ],
          })(<Input size='small' />)}
        </Form.Item>
      </Form>
      <i>增加不可修改。请确定后添加。</i>
    </Modal>
  );
}

const injectStore: [] = withStore('basic', NAME_SPACE);
export default connect(...injectStore)(Form.create<IOutProps>()(CreateModal));