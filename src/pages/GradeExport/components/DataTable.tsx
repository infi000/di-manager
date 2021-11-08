import * as React from 'react';
import { connect } from 'react-redux';
import { message, Popconfirm, Table } from 'antd';
import { TableBtn, TableBtnGroup } from '@/components/TableContainer';
import withStore from '@/store/withStore';
import ListPage from '@/components/ListPage';
import { Form, Input, Select } from '@/components/AntPlus';
import { useTableScrollX, useTableRenderNull } from '@/utils/hooks';
import { useHistory } from 'react-router-dom';
import { NAME_SPACE } from '../constants';
import { IProps, ITableItem } from '../type';
import { servicePostExportO, servicePostExportU } from '../services';

const { useState, useEffect } = React;

const DataTable = (props: IProps & { isReferee: boolean }) => {
  const {
    tableList,
    form,
    tableListTotal,
    getTableList,
    updateModalData,
    updateModalFile,
    tablePage,
    serchParams,
    sdictMap,
    dictQMap,
    dictAMap,
    isReferee,
    getDic,
    getSdic
  } = props;
  const history = useHistory();


  const handleExportOScore = () => {
    const { sid } = serchParams;
    if (!sid) {
      message.warn('请先选择比赛点击搜索');
      return;
    }
    servicePostExportO({ sid });
  };

  const handleExportRank = () => {
    const { sid } = serchParams;
    if (!sid) {
      message.warn('请先选择比赛点击搜索');
      return;
    }
    servicePostExportU({ sid });
  };

  /**
   * 详情
   * @param status
   */
  const handleDetail = (opt: ITableItem) => {
    updateModalData({ show: true, data: opt });
  };

  /**
   * 作品
   * @param status
   */
  const handleFile = (opt: ITableItem) => {
    updateModalFile({ show: true, data: opt });
  };

  const handleLogout = () => {
    window.open('/di/login');
  };

  const handleChangeSid = (sid: any) => {
    getDic({ sid });
  };
  const fields = () => (
    <> <Select
      label='比赛id'
      id='sid'
      msg='full'
      keys={['id', 'title']}
      allowClear
      data={sdictMap}
      onChange={handleChangeSid}
    />
      <Select
        label='组别'
        id='age'
        msg='full'
        allowClear
        keys={['age', 'age']}
        data={dictAMap}
      />
      <Select
        label='TC题目'
        id='qid'
        msg='full'
        allowClear
        keys={['qid', 'title']}
        data={dictQMap}
      />
    </>
  );
  /**
   * 列表
   */
  const columns = useTableRenderNull([
    {
      title: 'tid',
      dataIndex: 'tid',
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
      title: '原始分数',
      dataIndex: 'oscore',
      width: 180,
    },
    // {
    //   title: '比例分数',
    //   dataIndex: 'rankscore',
    //   width: 180,
    // },
    {
      title: '操作',
      dataIndex: 'action',
      width: 180,
      fixed: 'right',
      render: (_: string, record: ITableItem) => (
        <TableBtnGroup>
          { isReferee && <TableBtn onClick={() => { handleFile(record); }}>查看作品</TableBtn>}
          { isReferee && <TableBtn onClick={() => { handleDetail(record); }}>查看分数</TableBtn>}
          { !isReferee && <TableBtn onClick={() => { handleDetail(record); }}>查看</TableBtn>}
        </TableBtnGroup>
      ),
    },
  ], []);
  const scrollX = useTableScrollX(columns, [tableList]);
  useEffect(() => {
    if (serchParams.sid) {
      getDic({ sid: serchParams.sid });
    }
  }, [serchParams.sid]);
  useEffect(() => {
    getSdic();
  }, []);


  const hasOtherBtn = () => {
    const OtherBtn = [
      { otherBtnClick: handleExportOScore, otherBtnName: '导出原始分', power: isReferee ? 0 : 1 },
      { otherBtnClick: handleExportRank, otherBtnName: '导出比例分', power: isReferee ? 0 : 1 },
      { otherBtnClick: handleLogout, otherBtnName: '退出', power: isReferee ? 1 : 0 },
    ];
    return OtherBtn.filter(item => item.power);
  };

  return (
    <>
      <ListPage
        total={tableListTotal}
        fields={fields()}
        form={form} // 表单必须
        pageInfo={tablePage}
        // onNav={getChangePage}
        params={serchParams} // 表单域数据
        onSearch={getTableList} // 查询
        columns={columns} // Table 组件 `columns`
        rowKey='id' // table row 唯一标识，不是 `id` 时传入
        // rowSelection={rowSelection}
        data={tableList} // 列表数据
        scroll={{ x: scrollX, y: 460 }}
        hasOtherBtn={hasOtherBtn()}
      />
    </>
  );
};
const injectStore: [] = withStore('basic', NAME_SPACE);

export default (connect(...injectStore)(Form.create()(DataTable)) as any);
