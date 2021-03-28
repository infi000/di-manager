import * as React from 'react';
import { connect } from 'react-redux';
import { message, Popconfirm, Table } from 'antd';
import { TableBtn, TableBtnGroup } from '@/components/TableContainer';
import withStore from '@/store/withStore';
import ListPage from '@/components/ListPage';
import Path from '@/components/Path';
import { Form } from '@/components/AntPlus';
import { useTableScrollX, useTableRenderNull } from '@/utils/hooks';
import { NAME_SPACE } from '../constants';
import { IProps, ITableItem } from '../type';
import { useHistory } from 'react-router-dom';
import qs from 'qs';

const { useState, useEffect } = React;

const DataTable = (props: IProps) => {
  const {
    tableList,
    form,
    tableListTotal,
    getTableList,
    updateModalData,
    getChangePage,
    tablePage,
    serchParams
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const history = useHistory();
  const [pathList, setPathList] = useState([{ name: '赛事管理',link:'/gameManager' },{ name: '题目管理' }]);
  useEffect(() => {
    const params: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    props.updateSid(params.sid);
    setPathList([{ name: `赛事管理(${params.title})`,link:'/gameManager' },{ name: '题目管理' }]);
    getTableList();
    return ()=>{
      props.updateSid('');
    }
  }, [])


  /**
   * 退回
   */
  const handleBack = () => {
    history.goBack();
  }

  /**
   * 管理题目文件描述
   */
  const handleManagerFile = (qid:string, title?:string) => {
    history.push(`gameFileDesc?qid=${qid}&title=${title}`);
  }

  /**
   * 管理题评分标准
   */
  const handleJudge = (qid:string, title?:string) => {
    history.push(`gameJudgeManager?qid=${qid}&title=${title}`);
  }

  /**
   * 管理裁判类型
   */
  const handleReffer = (qid:string, title?:string) => {
    history.push(`gameReffer?qid=${qid}&title=${title}`);
  }

  /**
   * 刷新列表
   */
  const handleRefresh = () => {
    getTableList();
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
   * 列表
   */
  const columns = useTableRenderNull([
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '题目',
      dataIndex: 'title',
      width: 180,
    },
    {
      title: '题目别名',
      dataIndex: 'alias',
      width: 180,
    },
    {
      title: '报名最小人数',
      dataIndex: 'usermincount',
      width: 180,
    },
    {
      title: '报名最大人数',
      dataIndex: 'usermaxcount',
      width: 180,
    },
    {
      title: '简述',
      dataIndex: 'content',
      width: 180,
    },
    {
      title: '旅程指南',
      dataIndex: 'guide',
      width: 180,
    },
    {
      title: '挑战题文件',
      dataIndex: 'challenge',
      width: 180,
    },
    {
      title: '即时挑战训练册',
      dataIndex: 'trainbook',
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 330,
      fixed: 'right',
      render: (_: string, record: ITableItem) => {
        const { id,title } = record;
        return (
          <TableBtnGroup>
            <TableBtn onClick={() => { handleEdit(record) }}>修改</TableBtn>
            <TableBtn onClick={() => { handleManagerFile(id,title) }}>编辑文件描述</TableBtn>
            <TableBtn onClick={() => { handleJudge(id,title) }}>编辑评分标准</TableBtn>
            <TableBtn onClick={() => { handleReffer(id,title) }}>编辑裁判类型</TableBtn>
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

  const hasOtherBtn=[
    { otherBtnClick: handleCreate, otherBtnName: '新建' }, 
    { otherBtnClick: handleRefresh, otherBtnName: '刷新' },
    { otherBtnClick: handleBack, otherBtnName: '返回' },
  ]
  console.log("pathList",pathList);
  return (
    <>
      <Path list={pathList} />
      <ListPage
        total={tableListTotal}
        hideFormSearch
        hasOtherBtn={hasOtherBtn}
        pageInfo={tablePage}
        onNav={getChangePage}
        form={form} // 表单必须
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
