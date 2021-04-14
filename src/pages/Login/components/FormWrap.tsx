import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import withStore from '@/store/withStore';
import FormButtonWrap from '@/components/FormButtonWrap';
import { NAME_SPACE } from '../constants';
import { IState, TAction } from '../types';


type IOutProps = FormComponentProps
interface IInProps extends IOutProps, TAction, IState, IBasicState {
  history: any;
}

const Wrap = styled.div`
  padding:20px 10px;
`;

const WrapInfo = styled.div`
  padding:20px;
`;
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
        history.push('/gameManager');
      }
    });
  };
  const handleRegister = () => {
    history.push('register');
  };
  return (
    <Wrap><Form {...formItemLayout}>

      <Form.Item label='用户名'>
        {getFieldDecorator('mname', {
          rules: [
            {
              required: true,
              message: '输入用户名',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label='密码'>
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
        {/* <Button onClick={handleRegister} shape="round">注册</Button> */}
        <Button onClick={handleSubmit} type='danger' shape='round'>登陆</Button>
      </FormButtonWrap>
    </Wrap>
  );
};


const injectStore: [] = withStore('basic', NAME_SPACE);
export default connect(...injectStore)(Form.create<IOutProps>()(FormWrap));
