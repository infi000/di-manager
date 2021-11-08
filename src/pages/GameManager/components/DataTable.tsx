import * as React from 'react';
import { connect } from 'react-redux';
import { message, Popconfirm } from 'antd';
import { TableBtn, TableBtnGroup } from '@/components/TableContainer';
import withStore from '@/store/withStore';
import ListPage from '@/components/ListPage';
import Path from '@/components/Path';
import { Form, Input, Select } from '@/components/AntPlus';
import { useTableScrollX, useTableRenderNull } from '@/utils/hooks';
import { useHistory } from 'react-router-dom';
import { HOST_H5 } from '@/constants';
import { NAME_SPACE } from '../constants';
import { IProps, ITableItem } from '../type';

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
    serchParams,
    areas
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getTableList();
  }, []);
  const fields = () => (
    <>
      <Select
        label='地址id'
        id='aid'
        msg='full'
        allowClear
        keys={['id', 'aname']}
        data={areas}
      />
    </>
  );
  /**
   * 刷新列表
   */
  const handleRefresh = () => {
    getTableList();
  };
  /**
   * 开启
   * @param status
   */
  const handleOpen = (id: string) => {
    postOpen(id);
  };

  /**
   * 关闭
   * @param status
   */
  const handleClose = (id: string) => {
    postClose(id);
  };

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

  /**
   * 跳转比赛编辑
   */
  const handleManagerQuestion = (sid: string, title?: string) => {
    history.push(`gameTopicManager?sid=${sid}&title=${title}`);
  };

  const handleOpenBg = (record: ITableItem) => {
    const params = encodeURIComponent(`sid=${record.id}&aid=${record.aid}&bg=${record.thumbinal}`);
    window.open(`${HOST_H5}/ad?${params}`, '_blank');
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
      title: '比赛标题',
      dataIndex: 'title',
      width: 180,
    },
    {
      title: '比赛状态',
      dataIndex: 'status',
      width: 180,
      render: txt => txt == '1' ? '开启' : ' 关闭'
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
      title: '方案提交入口',
      dataIndex: 'thumbinal',
      width: 180,
      render: (_, record) => {
        const params = encodeURIComponent(`sid=${record.id}&aid=${record.aid}&bg=${record.thumbinal}`);
        const url = `${HOST_H5}/leaderLogin?${params}`;
        return <a href={url} target='_blank' rel='noreferrer'>{url}</a>;
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      fixed: 'right',
      render: (_: string, record: ITableItem) => {
        const { id, status, title } = record;
        return (
          <TableBtnGroup>
            <TableBtn onClick={() => { handleEdit(record); }}>修改</TableBtn>
            <TableBtn power={status && status == '1' ? 0 : 1} onClick={() => { handleOpen(id); }}>开启赛事</TableBtn>
            <TableBtn power={status && status == '1' ? 1 : 0} onClick={() => { handleClose(id); }}>关闭赛事</TableBtn>
            <TableBtn onClick={() => { handleManagerQuestion(id, title); }}>编辑题目</TableBtn>
            <TableBtn onClick={() => { handleOpenBg(record); }}>海报地址</TableBtn>
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

  const hasOtherBtn = [{ otherBtnClick: handleCreate, otherBtnName: '新建' }, { otherBtnClick: handleRefresh, otherBtnName: '刷新' }];
  return (
    <>
      <Path list={[{ name: '赛事管理' }]} />
      <ListPage
        total={tableListTotal}
        hasOtherBtn={hasOtherBtn}
        fields={fields()}
        form={form} // 表单必须
        params={serchParams} // 表单域数据
        onSearch={getTableList} // 查询
        listLoading={false} // 获取数据 loading
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
