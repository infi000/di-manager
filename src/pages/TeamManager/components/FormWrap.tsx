import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import { NAME_SPACE, UTYPE_OPTION } from '../constants';
import FormButtonWrap from '@/components/FormButtonWrap';
import { AGE_TYPE_ARR } from '@/constants';
import withStore from '@/store/withStore';
import { IState, TAction } from '../type';

interface IOutProps extends FormComponentProps {

}
interface IInProps extends IOutProps, TAction, IState, IBasicState {
}

const Wrap = styled.div`
  padding:20px 10px;
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
  const { postCreate, updatePostParams, updateContentType, getQuestion, userInfo, questionList } = props;
  const { getFieldDecorator, validateFields } = props.form;
  const formartQuestion = useMemo(() => {
    const list = questionList.map((item) => {
      const { title, sid, id } = item;
      const value = JSON.stringify({ sid, qid: id });
      const label = title;
      return { value, label }
    });
    return list;
  }, [questionList])
  const handleRegister = () => {
    validateFields((err, value) => {
      const val = { ...value };
      if (!err) {
        const { question } = val;
        const { sid, qid } = JSON.parse(question);
        delete val.question;
        updatePostParams({ ...val, sid, qid });
        postCreate(val);
      }
    })
  }
  const handleCancel = () => {
    updateContentType('showTeam');
    updatePostParams(null);
  }
  return <Wrap>
    <Form {...formItemLayout} >
      <Form.Item label="领队姓名">
        <Input disabled value={userInfo.uname} />
      </Form.Item>
      <Form.Item label="电话">
        {getFieldDecorator('phone', {
          initialValue: userInfo.phone
        })(<Input disabled />)}
      </Form.Item>
      <Form.Item label="省份">
        {getFieldDecorator('province', {
          initialValue: userInfo.province
        })(<Input disabled />)}
      </Form.Item>
      <Form.Item label="学校">
        {getFieldDecorator('school', {
          initialValue: userInfo.school
        })(<Input disabled />)}
      </Form.Item>
      <Form.Item label="邮箱">
        {getFieldDecorator('email', {
          initialValue: userInfo.email
        })(<Input disabled />)}
      </Form.Item>
      <Form.Item label="领队姓名">
        {getFieldDecorator('uid', {
          initialValue: '123'
        })(<Input disabled />)}
      </Form.Item>
      <Form.Item label="队伍名称（中）">
        {getFieldDecorator('tname', {
          rules: [
            {
              required: true,
              message: '输入队伍名称',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="队伍名称（英）">
        {getFieldDecorator('tename', {
          rules: [],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="年龄组">
        {getFieldDecorator('age', {
          rules: [
            {
              required: true,
              message: '输入年龄组',
            },
          ],
        })(<Select allowClear>
          {
            AGE_TYPE_ARR.map((item, index) => {
              return <Select.Option key={item} value={item}>{item}</Select.Option>
            })
          }
        </Select>)}
      </Form.Item>
      <Form.Item label="团队挑战">
        {getFieldDecorator('question', {
          rules: [
            {
              required: true,
              message: '输入报名题',
            },
          ],
        })(<Select allowClear>
          {
            formartQuestion.map((item, index) => {
              return <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
            })
          }
        </Select>)}
      </Form.Item>
    </Form>
    <FormButtonWrap>
      <Button onClick={handleCancel} >取消</Button>
      <Button onClick={handleRegister} type="danger" >提交</Button>
    </FormButtonWrap>
  </Wrap>
}


const injectStore: [] = withStore('basic', NAME_SPACE);
export default connect(...injectStore)(Form.create<IOutProps>()(FormWrap));
