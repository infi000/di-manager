import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import { NAME_SPACE } from '../constants';
import withStore from '@/store/withStore';
import { IState, TAction } from '../types';
import FormButtonWrap from '@/components/FormButtonWrap';


interface IOutProps extends FormComponentProps {

}
interface IInProps extends IOutProps, TAction, IState, IBasicState {
  history: any
}

const Wrap = styled.div`
  padding:20px 10px;
`

const WrapInfo = styled.div`
  padding:20px;
`
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const FormWrap = (props: IInProps) => {
  const { postPostLogin } = props;
  const { getFieldDecorator, validateFields } = props.form;
  const history = useHistory();
  const handleSubmit = async () => {
    validateFields(async (err, val) => {
      if (!err) {
        await postPostLogin(val);
        history.push('/');
      }
    })
  }
  const handleRegister = () => {
    history.push('/register');
  }
  return <Wrap><Form {...formItemLayout} >

    <Form.Item label="姓名">
      {getFieldDecorator('uname', {
        rules: [
          {
            required: true,
            message: '输入姓名',
          },
        ],
      })(<Input />)}
    </Form.Item>
    <Form.Item label="密码">
      {getFieldDecorator('pass', {
        rules: [
          {
            required: true,
            message: '输入密码',
          },
        ],
      })(<Input.Password />)}
    </Form.Item>
  </Form>
    <FormButtonWrap>
      <Button onClick={handleRegister} shape="round">注册</Button>
      <Button onClick={handleSubmit} type='danger' shape="round">登陆</Button>
    </FormButtonWrap>
    <WrapInfo>
      <i>已经获得挑战号(原会员号)的团队，使用挑站号为用户名，领队联系电话为登陆密码</i>
    </WrapInfo>
  </Wrap>
}


const injectStore: [] = withStore('basic', NAME_SPACE);
export default connect(...injectStore)(Form.create<IOutProps>()(FormWrap));
