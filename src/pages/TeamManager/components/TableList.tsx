import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, InputNumber, Select, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import { NAME_SPACE, UTYPE_OPTION } from '../constants';
import { EIsPay } from '@/constants';
import withStore from '@/store/withStore';
import { IState, TAction } from '../type';
import { useTableRenderNull } from '@/utils/hooks';
import { TableBtn } from '@/components/TableContainer';

const ISPAY_MAP = new Map([
  [EIsPay['未支付'], '未支付'],
  [EIsPay['支付成功'], '支付成功'],
  [EIsPay['支付失败'], '支付失败']
])
const HeaderWrap = styled.div`
  text-align:right;
  padding:0 20px;
`;

interface IInProps extends TAction, IState {
}
const TableList = (props: IInProps) => {
  const { getTeam, tableList, updateContentType, updateModalData, updateCreateOrderInfo } = props;

  /**
   * 新建队伍
   */
  const handleCreateTeam = () => {
    updateContentType('createTeam');
  }

  /**
   * 编辑队员
   * @param opt 
   */
  const handleEditMember = (opt: any) => {
    updateModalData({
      show: true,
      data: { ...opt }
    })
  }
  /**
   * 创建订单
   * @param opt 
   */
  const handleCreateOrder = (opt: any) => {
    updateContentType('createOrder');
    updateCreateOrderInfo(opt);
  }
  const columns = useTableRenderNull([
    { title: '队伍名称', dataIndex: 'tname' },
    { title: '支付状态', dataIndex: 'ispay', render: (text: any) => <span>{ISPAY_MAP.get(text) || '-'}</span> },
    { title: '考试材料', dataIndex: 'url' },
    { title: '会员号', dataIndex: 'tcode' },
    { title: '上传密码', dataIndex: 'pass' },
    {
      title: '队员列表', dataIndex: 'users', render: (text: any) => {
        if (Array.isArray(text)) {
          return text.map(item => <div><b>{item.realname}</b></div>)
        }
        return '-'
      }
    },
    {
      title: '操作', dataIndex: 'action', render: (text, opt) => {
        return <Button.Group>
          <Button size='small' onClick={() => handleEditMember(opt)} disabled={opt.canchange === '0'}>编辑队员</Button>
          {
            ISPAY_MAP.get(opt.ispay) === '未支付'
            && <Button size='small' onClick={() => handleCreateOrder(opt)}>支付</Button>
          }
        </Button.Group>
      }
    },
  ], []);
  useEffect(() => {
    getTeam();
  }, [])
  return <Table columns={columns} key='id' dataSource={tableList} pagination={false} title={() => <HeaderWrap><Button onClick={handleCreateTeam} size='small' shape='round' type='danger'>新建队伍</Button></HeaderWrap>} />
}

const injectStore: [] = withStore('basic', NAME_SPACE);
export default connect(...injectStore)<any>(TableList);