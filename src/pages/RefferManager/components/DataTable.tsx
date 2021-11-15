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
import qs from 'qs';
import { ADUIT_STATUS_MAP, NAME_SPACE } from '../constants';
import { IProps, ITableItem } from '../type';

const ADUIT_OPTION = Object.entries(ADUIT_STATUS_MAP).map((item) => {
  const [id, label] = item;
  return { id, label };
});

const { useState, useEffect } = React;

const DataTable = (props: IProps) => {
  const {
    tableList,
    form,
    tableListTotal,
    getTableList,
    postAudit,
    getChangePage,
    updateModalData,
    tablePage,
    serchParams
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const history = useHistory();

  const fields = () => (
    <> 
    {/* <Input
      label='比赛id'
      id='sid'
      msg='full'
    /> */}
      <Select
        label='状态'
        id='status'
        msg='full'
        allowClear
        data={ADUIT_OPTION}
      />
    </>
  );
  /**
   * 审核
   */
  const handleAudit = (uid: string, status: '1' | '4') => {
    postAudit({ status, uid });
  };
  /**
   * 批量分配到比赛
   */
  const handleBatchAutoAdd = () => {
    console.log('selectedRowKeys', selectedRowKeys);
    if (selectedRowKeys.length > 0) {
      updateModalData({
        data: {
          uids: selectedRowKeys.join(','),
        },
        type: 'batchAdd',
        show: true
      });
    }
  };
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
      title: '姓名',
      dataIndex: 'uname',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 180,
      render: (_: '1' | '4') => ADUIT_STATUS_MAP[_] || '-'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 180,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 180,
    },
    {
      title: '组委',
      dataIndex: 'aname',
      width: 180,
    },
    {
      title: '学校/机构',
      dataIndex: 'school',
      width: 180,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 130,
      fixed: 'right',
      render: (_: string, record: ITableItem) => {
        const { status, id } = record;

        return (
          <TableBtnGroup>
            <TableBtn power={status == '1' ? 1 : 0} onClick={() => { handleAudit(id, '4'); }}>审核不通过</TableBtn>
            <TableBtn power={status == '4' ? 1 : 0} onClick={() => { handleAudit(id, '1'); }}>审核通过</TableBtn>
            {/* <TableBtn onClick={() => { handleEdit(record); }}>不通过</TableBtn>
            <TableBtn onClick={() => { handleManagerFile(id, title); }}>编辑文件描述</TableBtn>
            <TableBtn onClick={() => { handleJudge(id, title); }}>编辑评分标准</TableBtn>
            <TableBtn onClick={() => { handleReffer(id, title); }}>编辑裁判类型</TableBtn> */}
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

  const hasOtherBtn = [
    { otherBtnClick: handleBatchAutoAdd, otherBtnName: '批量分配到比赛' },
  ];

  return (
    <>
      <Path list={[{ name: '裁判审核' }]} />
      <ListPage
        total={tableListTotal}
        fields={fields()}
        pageInfo={tablePage}
        onNav={getChangePage}
        form={form} // 表单必须
        hasOtherBtn={hasOtherBtn}
        params={serchParams} // 表单域数据
        onSearch={getTableList} // 查询
        columns={columns} // Table 组件 `columns`
        rowKey='id' // table row 唯一标识，不是 `id` 时传入
        rowSelection={rowSelection}
        data={tableList} // 列表数据
        scroll={{ x: scrollX, y: 460 }}
      />
    </>
  );
};
const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(Form.create()(DataTable));
