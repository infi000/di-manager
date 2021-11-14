import * as React from 'react';
import { connect } from 'react-redux';
import { message, Popconfirm, Table } from 'antd';
import { TableBtn, TableBtnGroup } from '@/components/TableContainer';
import withStore from '@/store/withStore';
import ListPage from '@/components/ListPage';
import Path from '@/components/Path';
import { Form, Input, Select } from '@/components/AntPlus';
import { useTableScrollX, useTableRenderNull } from '@/utils/hooks';
import { uniqueArray } from '@/utils/utils';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { ADUIT_STATUS_MAP, NAME_SPACE } from '../constants';
import { IProps, ITableItem, TJudges, TJtItem } from '../type';

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
    updateModalData,
    serchParams,
    sdictMap,
    getSdic
  } = props;
  const history = useHistory();

  const handleBatchAdd = (opt: TJtItem) => {
    const { qid = '', id = '' } = opt;
    updateModalData({ show: true, data: { qid, jtid: id } });
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
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '别名',
      dataIndex: 'alias',
    },
  ], []);
  const scrollX = useTableScrollX(columns, [tableList]);

  /**
   * 子列表
   */
  const columnsChild = useTableRenderNull([
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '裁判类型',
      dataIndex: 'jtype',
      width: 100,
    },
    {
      title: '当前裁判',
      dataIndex: 'judges',
      render: (_: TJudges[]) => {
        const arr = _ || [];
        console.log(arr);
        if (arr.length > 0) {
          // return arr.map(item => <span>{item.realname || '-'}</span>);
          return uniqueArray(arr.map(item => item.uname)).join(',');
        }
        return '暂无';
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      render: (_: string, record: TJtItem) => (
        <TableBtnGroup>
          <TableBtn onClick={() => handleBatchAdd(record)}>分配</TableBtn>
        </TableBtnGroup>
      ),
    },
  ], []);
  useEffect(() => {
    getSdic();
  }, []);


  return (
    <>
      <Path list={[{ name: '裁判分配' }]} />
      <ListPage
        total={tableListTotal}
        fields={fields()}
        // pageInfo={tablePage}
        // onNav={getChangePage}
        form={form} // 表单必须
        params={serchParams} // 表单域数据
        onSearch={getTableList} // 查询
        columns={columns} // Table 组件 `columns`
        rowKey='id' // table row 唯一标识，不是 `id` 时传入
        // rowSelection={rowSelection}
        data={tableList} // 列表数据
        scroll={{ x: scrollX, y: 460 }}
        expandedRow={(opt: ITableItem) => {
          const ds = Array.isArray(opt.jts) ? opt.jts.map((item) => {
            // eslint-disable-next-line no-param-reassign
            item.qid = opt.id;
            return item;
          }) : [];
          return (
            <Table
              bordered
              columns={columnsChild}
              dataSource={ds}
              rowKey='id'
              pagination={false}
            />
          );
        }

        }
        defaultExpandAllRows
      />
    </>
  );
};
const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(Form.create()(DataTable));
