import React from 'react';
import styled from 'styled-components';
import FormButtonWrap from '@/components/FormButtonWrap';
import { IState, TAction } from '../type';
import { Button } from 'antd';
import withStore from '@/store/withStore';
import { connect } from 'react-redux';
import { NAME_SPACE } from '../constants';
import { WEPAYINFO_URL, WEPAY_URL, ALIPAY_URL, ALIPAYINFO_URL } from '@/constants';
const Wrap = styled.div`
  padding:30px;
  background:#fff;
`
const WrapCon = styled.div`
  margin-bottom:20px;
`
const WrapImg = styled.div`
  width:200px;
  img{
    width:100%
  }
`

interface IInProps extends TAction, IState {
}
const PayInfo = (props: IInProps) => {
  const { updateContentType } = props;
  const handleSubmit = () => {
    updateContentType('showTeam');
  }
  return <Wrap>
    <WrapCon>
      <h1>一 对公付款</h1>
      <h2>1.支付方法</h2>
      <p>请前往银行柜台或使用手机银行APP，按以下汇款信息填写，完成付款：</p>
      <ul>
        <li>汇款名称：目的地想象（北京）文化有限公司</li>
        <li>银行账号：3211 6010 0100 2624 99</li>
        <li>开户银行：兴业银行北京三元桥支行</li>
      </ul>
      <h2>2.备注要求：</h2>
      <p>请在汇款备注栏注明：①学校 ②姓名及队名</p>
    </WrapCon>
    <WrapCon>
      <h1>二 微信扫码支付</h1>
      <h2>1.支付方法</h2>
      <p>请使用微信APP扫描下方二维码，进行线上支付，完成付款：<p />
        <WrapImg><img src={WEPAY_URL} /></WrapImg>
        <h2>2.备注要求</h2>
        <p>请在付款界面金额下方备注栏注明：①学校 ②姓名及队名</p>
        <WrapImg><img src={WEPAYINFO_URL} /></WrapImg>
        <h2>3.线上支付成功后，请按以下步骤操作保存汇款凭证：</h2>
        <p>打开微信APP → 点击右下角“我” → 点击“支付” → 点击右上方“钱包” → 点击右上角“账单”→ 选择并点击此笔交易 → 显示“账单详情”，请手机截屏 → 发送至DI中国区工作人员，以便财务及时查收汇款。</p>
      </p>
    </WrapCon>
    <WrapCon>
      <h1>三 支付宝扫码支付</h1>
      <h2>1.支付方法</h2>
      <p>请使用支付宝APP扫描下方二维码，进行线上支付，完成付款：</p>
      <WrapImg><img src={ALIPAY_URL} /></WrapImg>
      <h2>2.备注要求.</h2>
      <p>请在付款界面金额下方备注栏注明：①学校 ②姓名及队名</p>
      <WrapImg><img src={ALIPAYINFO_URL} /></WrapImg>
      <h2>3.线上支付成功后，请按以下步骤操作保存汇款凭证：</h2>
      <p>打开支付宝APP → 点击右下角“我的” → 点击“账单” → 选择并点击此笔交易 → 显示“账单详情”，请手机截屏 → 发送至DI中国区工作人员，以便财务及时查收汇款。</p>
    </WrapCon>
    <FormButtonWrap>
      <Button type='danger' shape='round' onClick={handleSubmit}>完成</Button>
    </FormButtonWrap>
  </Wrap>
}


const injectStore: [] = withStore('basic', NAME_SPACE);
export default connect(...injectStore)<any>(PayInfo);
