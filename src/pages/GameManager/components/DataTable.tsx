import * as React from 'react';
import { connect } from 'react-redux';
import { message, Popconfirm } from 'antd';
import { TableBtn, TableBtnGroup } from '@/components/TableContainer';
import withStore from '@/store/withStore';
import ListPage from '@/components/ListPage';
import Path from '@/components/Path';
import { Form } from '@/components/AntPlus';
import { useTableScrollX, useTableRenderNull } from '@/utils/hooks';
import { NAME_SPACE } from '../constants';
import { IProps, ITableItem } from '../type';
import { useHistory } from 'react-router-dom';

const { useState, useEffect } = React;

const DataTable = (props: IProps) => {
  const {
    tableList,
    form,
    tableListTotal,
    getTableList,
    postClose,
    postOpen,
    updateModalData,
    serchParams
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getTableList();
  }, []);

  /**
   * 刷新列表
   */
  const handleRefresh = () => {
    getTableList();
  }
  /**
   * 开启
   * @param status 
   */
  const handleOpen = (id: string) => {
    postOpen(id);
  }

  /**
   * 关闭
   * @param status 
   */
  const handleClose = (id: string) => {
    postClose(id);
  }

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
  }

  /**
   * 跳转比赛编辑
   */
  const handleManagerQuestion = (sid: string, title?: string) =>{
    history.push(`gameTopicManager?sid=${sid}&title=${title}`);
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
      title: '比赛标题',
      dataIndex: 'title',
      width: 180,
    },
    {
      title: '比赛状态',
      dataIndex: 'status',
      width: 180,
      render:(txt)=>{return txt == '1'?'开启' :' 关闭'}
    },
    {
      title: '比赛描述',
      dataIndex: 'describe',
      width: 180,
    },
    {
      title: '比赛地点',
      dataIndex: 'address',
      width: 180,
    },
    {
      title: '比赛开始时间',
      dataIndex: 'starttime',
      width: 180,
    },
    {
      title: '比赛结束时间',
      dataIndex: 'endtime',
      width: 180,
    },
    {
      title: '注册开始时间',
      dataIndex: 'regstarttime',
      width: 180,
    },
    {
      title: '注册结束时间',
      dataIndex: 'regendtime',
      width: 180,
    },
    {
      title: '提交方案开始时间',
      dataIndex: 'commitstarttime',
      width: 180,
    },
    {
      title: '提交方案结束时间',
      dataIndex: 'commitendtime',
      width: 180,
    },

    {
      title: '评比开始时间',
      dataIndex: 'evaluationstarttime',
      width: 180,
    },

    {
      title: '评比结束时间',
      dataIndex: 'evaluationendtime',
      width: 180,
    },

    {
      title: '成绩公布时间',
      dataIndex: 'resulttime',
      width: 180,
    },

    {
      title: '报名费用',
      dataIndex: 'money',
      width: 180,
    },
    {
      title: '比赛公告模板（样式）',
      dataIndex: 'model',
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      fixed: 'right',
      render: (_: string, record: ITableItem) => {
        const { id, status,title } = record;
        return (
          <TableBtnGroup>
            <TableBtn onClick={() => { handleEdit(record) }}>修改</TableBtn>
            <TableBtn power={status && status == '1' ? 0 : 1} onClick={() => { handleOpen(id) }}>开启赛事</TableBtn>
            <TableBtn power={status && status == '1' ? 1 : 0} onClick={() => { handleClose(id) }}>关闭赛事</TableBtn>
            <TableBtn onClick={() => { handleManagerQuestion(id,title) }}>编辑题目</TableBtn>
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

  const hasOtherBtn =[{ otherBtnClick: handleCreate, otherBtnName: '新建' }, { otherBtnClick: handleRefresh, otherBtnName: '刷新' }];
  return (
    <>
      <Path list={[{ name: '赛事管理' }]} />
      <ListPage
        total={tableListTotal}
        hasOtherBtn={hasOtherBtn}
        form={form} // 表单必须
        params={serchParams} // 表单域数据
        onSearch={getTableList} // 查询
        listLoading={false} // 获取数据 loading
        columns={columns} // Table 组件 `columns`
        rowKey='id' // table row 唯一标识，不是 `id` 时传入
        // rowSelection={rowSelection}
        hideFormSearch={true}
        data={tableList} // 列表数据
        scroll={{ x: scrollX, y: 460 }}
      />
    </>
  );
};
const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(Form.create()(DataTable));
