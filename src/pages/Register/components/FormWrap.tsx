import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import { NAME_SPACE, UTYPE_OPTION } from '../constants';
import withStore from '@/store/withStore';
import FormButtonWrap from '@/components/FormButtonWrap';
import { IState, TAction} from '../type';
import { useHistory } from 'react-router-dom';

interface IOutProps extends FormComponentProps {

}
interface IInProps extends IOutProps,TAction, IState {
}

const Wrap = styled.div`
  padding:20px 10px;
`
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
const FormWrap = (props: IInProps) => {
  const {postRegister,updatePostParams} = props;
  const { getFieldDecorator,validateFields } = props.form;
  const history = useHistory();
  const handleRegister = () => {
    validateFields(async (err,val)=>{
      if(!err){
        updatePostParams(val);
        await postRegister();
        history.push('/');
      }
    })
  }
  const handleCancel = () => {
    history.push('/login');
  }
  return <Wrap><Form {...formItemLayout} >
    <Form.Item label="省份">
      {getFieldDecorator('province', {
        rules: [
          {
            required: true,
            message: '输入省份',
          },
        ],
      })(<Input />)}
    </Form.Item>
    <Form.Item label="身份">
      {getFieldDecorator('utype', {
        rules: [
          {
            required: true,
            message: '输入角色',
          },
        ],
      })(<Select>
        {
          UTYPE_OPTION.filter(item => item.label!=='会员号').map(item => {
            const { label, value } = item;
            return <Select.Option value={value} key={value}>{label}</Select.Option>
          })
        }
      </Select>)}
    </Form.Item>
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
    <Form.Item label="电话">
      {getFieldDecorator('phone', {
        rules: [
          {
            required: true,
            message: '输入电话',
          },
        ],
      })(<InputNumber style={{ width: "100%" }} />)}
    </Form.Item>
    <Form.Item label="年龄">
      {getFieldDecorator('age', {
        rules: [],
      })(<InputNumber style={{ width: "100%" }} />)}
    </Form.Item>
    <Form.Item label="学校">
      {getFieldDecorator('school', {
        rules: [],
      })(<Input />)}
    </Form.Item>
    <Form.Item label="身份证号">
      {getFieldDecorator('ucard', {
        rules: [],
      })(<InputNumber style={{ width: "100%" }} />)}
    </Form.Item>
    <Form.Item label="电子邮箱">
      {getFieldDecorator('email', {
        rules: [],
      })(<Input />)}
    </Form.Item>
    <Form.Item label="登陆密码">
      {getFieldDecorator('pass', {
        rules: [
          {
            required: true,
            message: '输入登陆密码',
          },
        ],
      })(<Input.Password />)}
    </Form.Item>
  </Form>
  <FormButtonWrap>
  <Button onClick={handleCancel}  shape="round">返回</Button>
  <Button onClick={handleRegister}  shape="round" type='danger'>提交</Button>

  </FormButtonWrap>
  </Wrap>
}


const injectStore: [] = withStore('basic', NAME_SPACE);
export default connect(...injectStore)(Form.create<IOutProps>()(FormWrap));
