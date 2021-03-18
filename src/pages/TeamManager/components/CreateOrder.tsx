import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Button, Descriptions, Form, Input, InputNumber, Radio, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import { NAME_SPACE, PAYTYPE_MAP, NEEDBILL_MAP, BILLDETAIL_ARR, INVOICETYPE_MAP, BILLTYPE_MAP } from '../constants';
import FormButtonWrap from '@/components/FormButtonWrap';
import withStore from '@/store/withStore';
import { IState, TAction } from '../type';
import { useHistory } from 'react-router-dom';

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
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};
const CreateOrder = (props: IInProps) => {
  const { updateContentType, updateCreateOrderInfo, postCreateOrder, userInfo, questionList, createOrderInfo } = props;
  const { getFieldDecorator, validateFields, getFieldValue } = props.form;
  /**
   * 提交
   */
  const handleRegister = () => {
    validateFields((err, value) => {
      if (!err) {
        const val = { ...value };
        postCreateOrder(val);
      }
    })
  }
  /**
   * 取消
   */
  const handleCancel = () => {
    updateContentType('showTeam');
    updateCreateOrderInfo({});
  }
  return <Wrap>
    <Descriptions title="支付信息">
      <Descriptions.Item label="队伍名称">{createOrderInfo.tname}</Descriptions.Item>
      <Descriptions.Item label="组别">{createOrderInfo.age}</Descriptions.Item>
      <Descriptions.Item label="队员姓名" span={2}>{Array.isArray(createOrderInfo.users) ? createOrderInfo.users.map(item => item.realname+'、') : '-'}</Descriptions.Item>
      <Descriptions.Item label="题目">{createOrderInfo.qid}</Descriptions.Item>
      <Descriptions.Item label="支付报名费">{createOrderInfo.signupmoney}</Descriptions.Item>
    </Descriptions>
    <Form {...formItemLayout} >
      <Form.Item label="队伍id" style={{ display: 'none' }}>
        {getFieldDecorator('tid', {
          initialValue: createOrderInfo.id
        })(<Input />)}
      </Form.Item>
      <Form.Item label="支付方式">
        {getFieldDecorator('paytype', {
          initialValue:'unionpay'
        })(<Radio.Group>
          {
            Array.from(PAYTYPE_MAP).map((item, index) => {
              const [value, label] = item;
              return <Radio.Button key={value} value={value}>{label}</Radio.Button>
            })
          }
        </Radio.Group>)}
      </Form.Item>
      <Form.Item label="开票金额">
            {getFieldDecorator('money', {
              rules: [
                {
                  required: true,
                  message: '输入增值税发票',
                },
              ],
              initialValue: createOrderInfo.signupmoney
            })(<Input style={{width:100}}  />)}
          </Form.Item>
      <Form.Item label="是否需要发票">
        {getFieldDecorator('isneedbill', {
          initialValue: '0'
        })(<Radio.Group>
          {
            Array.from(NEEDBILL_MAP).map((item, index) => {
              const [value, label] = item;
              return <Radio key={value} value={value}>{label}</Radio>
            })
          }
        </Radio.Group>)}
      </Form.Item>
      {getFieldValue('isneedbill') == 1 &&
        <>
          <Form.Item label="开票项目">
            {getFieldDecorator('billdetail', {
              rules: [
                {
                  required: true,
                  message: '输入开票项目',
                },
              ],
            })(<Select allowClear>
              {
                BILLDETAIL_ARR.map((item, index) => {
                  return <Select.Option key={item} value={item}>{item}</Select.Option>
                })
              }
            </Select>)}
          </Form.Item>
          <Form.Item label="增值税发票">
            {getFieldDecorator('invoicetype', {
              rules: [
                {
                  required: true,
                  message: '输入增值税发票',
                },
              ],
            })(<Select allowClear>
              {
                Array.from(INVOICETYPE_MAP).map((item, index) => {
                  const [value, label] = item;
                  return <Select.Option key={value} value={value}>{label}</Select.Option>
                })
              }
            </Select>)}
          </Form.Item>

          <Form.Item label="发票种类" style={{display:`${getFieldValue('invoicetype') == 2 ? 'block': 'none'}`}}>
            {getFieldDecorator('billtype', {
              rules: [
                {
                  required: true,
                  message: '输入发票种类',
                },
              ],
              initialValue: '2'
            })(<Select allowClear>
              {
                Array.from(BILLTYPE_MAP).filter(item => {
                  if (getFieldValue('invoicetype') == 1 && item[0] == '1') {
                    return false
                  } return true
                }).map((item, index) => {
                  const [value, label] = item;
                  return <Select.Option key={value} value={value}>{label}</Select.Option>
                })
              }
            </Select>)}
          </Form.Item>
          <Form.Item label="联系人">
            {getFieldDecorator('uname', {
              rules: [],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('phone', {
              rules: [],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="电子邮箱">
            {getFieldDecorator('email', {
              rules: [],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="邮寄地址">
            {getFieldDecorator('address', {
              rules: [],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="开票抬头">
            {getFieldDecorator('company', {
              rules: [],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="开票抬头">
            {getFieldDecorator('company', {
              rules: [],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="纳税人识别号">
            {getFieldDecorator('companycode', {
              rules: [],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="开户行名称">
            {getFieldDecorator('bank', {
              rules: [
                {
                  required: true,
                  message: '输入开户行名称',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="开户行账号">
            {getFieldDecorator('bankcard', {
              rules: [
                {
                  required: true,
                  message: '输入账号',
                },
              ],
            })(<InputNumber style={{ width: "100%" }} />)}
          </Form.Item>
        </>
      }
      <Form.Item label="备注">
        {getFieldDecorator('remark', {
          rules: [
          ],
        })(<Input.TextArea />)}
      </Form.Item>
    </Form>
    <FormButtonWrap>
      <Button onClick={handleCancel} shape='round'>取消</Button>
      <Button onClick={handleRegister} type="danger" shape='round' >提交</Button>
    </FormButtonWrap>
  </Wrap>
}


const injectStore: [] = withStore('basic', NAME_SPACE);
export default connect(...injectStore)(Form.create<IOutProps>()(CreateOrder));
