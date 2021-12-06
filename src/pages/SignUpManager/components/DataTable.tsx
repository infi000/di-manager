import * as React from 'react';
import { connect } from 'react-redux';
import { message, Popconfirm, Table } from 'antd';
import { TableBtn, TableBtnGroup } from '@/components/TableContainer';
import withStore from '@/store/withStore';
import ListPage from '@/components/ListPage';
import Path from '@/components/Path';
import { Form, Input, Select } from '@/components/AntPlus';
import { useTableScrollX, useTableRenderNull } from '@/utils/hooks';
import { useHistory } from 'react-router-dom';
import { EPayType, EIsPay } from '@/constants';
import { NAME_SPACE, IS_PAY, PAY_TYPE } from '../constants';
import { IProps, ITableItem } from '../type';

const { useState, useEffect } = React;

const DataTable = (props: IProps) => {
  const {
    tableList,
    form,
    tableListTotal,
    getTableList,
    sdictMap,
    updateModalData,
    updateModalDataType,
    getChangePage,
    getInvoiceDetail,
    getSdic,
    tablePage,
    serchParams,
    userInfo
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const history = useHistory();

  /**
   * 支付状态修改
   * @param
   */
  const handlePayType = (tid: string) => {
    updateModalDataType({ show: true, data: tid });
  };

  /**
   * 挑战号
   * @param status
   */
  const handleSetCode = (tid: string, tcode?:string) => {
    if(tcode &&  userInfo.mtype == '2'){
      message.warn('已设置挑战号')
      return 
    }
    updateModalData({ show: true, data: tid });
  };

  const handleViewInvoice = (tid: string) => {
    getInvoiceDetail({ tid });
  };

  const fields = () => (
    <> <Select
      label='比赛id'
      id='sid'
      msg='full'
      keys={['id', 'title']}
      allowClear
      data={sdictMap}
    />
      <Input
        label='队伍名称'
        id='tname'
        msg='full'
      />
    </>
  );
  /**
   * 列表
   */
  const columns = useTableRenderNull([
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '队伍名称',
      dataIndex: 'tname',
      width: 180,
    },
    {
      title: '组别',
      dataIndex: 'age',
      width: 180,
    },
    {
      title: '挑战号',
      dataIndex: 'tcode',
      width: 180,
    },
    {
      title: '学校',
      dataIndex: 'school',
      width: 180,
    },
    {
      title: '省',
      dataIndex: 'province',
      width: 180,
    },
    {
      title: '市',
      dataIndex: 'city',
      width: 180,
    },
    {
      title: '支付状态',
      dataIndex: 'ispay',
      width: 180,
      render: (text: EIsPay) => <span>{IS_PAY[text]}</span>
    },
    {
      title: '支付方式',
      dataIndex: 'paytype',
      width: 180,
      render: (text: EPayType) => <span>{PAY_TYPE[text]}</span>
    },
    {
      title: '报名费',
      dataIndex: 'signupmoney',
      width: 180,
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 330,
      fixed: 'right',
      render: (_: string, record: ITableItem) => {
        const { id,tcode } = record;
        return (
          <TableBtnGroup>
            <TableBtn onClick={() => { handlePayType(id); }}>设置支付状态</TableBtn>
            <TableBtn onClick={() => { handleSetCode(id,tcode); }}>设置挑战号</TableBtn>
            <TableBtn onClick={() => { handleViewInvoice(id); }}>发票信息</TableBtn>

          </TableBtnGroup>
        );
      },
    },
  ], []);
  const scrollX = useTableScrollX(columns, [tableList]);

  const onTableSelectChange = (selectedValue: never[]) => {
    setSelectedRowKeys(selectedValue);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onTableSelectChange,
  };
  useEffect(() => {
    getSdic();
  }, []);

  const hasOtherBtn = [
  ];
  return (
    <>
      <Path list={[{ name: '报名管理' }]} />
      <ListPage
        total={tableListTotal}
        fields={fields()}
        form={form} // 表单必须
        pageInfo={tablePage}
        onNav={getChangePage}
        params={serchParams} // 表单域数据
        onSearch={getTableList} // 查询
        columns={columns} // Table 组件 `columns`
        rowKey='id' // table row 唯一标识，不是 `id` 时传入
        // rowSelection={rowSelection}
        data={tableList} // 列表数据
        scroll={{ x: scrollX, y: 460 }}
      />
    </>
  );
};
const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(Form.create()(DataTable));
