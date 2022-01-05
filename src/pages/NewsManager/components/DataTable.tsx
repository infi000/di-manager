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
    postDel,
    tablePage,
    serchParams
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const history = useHistory();
  /**
 * 新建
 * @param opt
 */
  const handleCreate = () => {
    updateModalData({ show: true, type: 'create', data: {} });
  };

  /**
 * 修改
 * @param status
 */
  const handleEdit = (opt: ITableItem) => {
    updateModalData({ show: true, type: 'edit', data: opt });
  };
  const fields = () => (
    <> 
    {/* <Select
      label='状态'
      id='status'
      msg='full'
      allowClear
      data={ADUIT_OPTION}
    /> */}
    </>
  );


  /**
   * 审核
   */
  const handleAudit = (uid: string, status: '1' | '4') => {
    postAudit({ status, uid });
  };

  const handleDel = (nid: string) => {
    postDel({ nid })
  }
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
      title: '标题',
      dataIndex: 'title',
      width: 180,
    },
    {
      title: '描述',
      dataIndex: 'describe',
      width: 180,
    },
    {
      title: '地区组委',
      dataIndex: 'aid',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 180,
      render: (_: '1' | '4' | '0') => ADUIT_STATUS_MAP[_] || '-'
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
            <TableBtn power={1} onClick={() => { handleDel(id); }}>删除</TableBtn>
            <TableBtn power={1} onClick={() => { handleEdit(record); }}>编辑</TableBtn>
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
    { otherBtnClick: handleCreate, otherBtnName: '新建' },
  ];

  return (
    <>
      <Path list={[{ name: '裁判管理' }]} />
      <ListPage
        total={tableListTotal}
        fields={fields()}
        pageInfo={tablePage}
        onNav={getChangePage}
        hasOtherBtn={hasOtherBtn}
        form={form} // 表单必须
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
