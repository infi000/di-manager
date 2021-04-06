import * as React from 'react';
import { connect } from 'react-redux';
import { message, Popconfirm, Table } from 'antd';
import { TableBtn, TableBtnGroup } from '@/components/TableContainer';
import withStore from '@/store/withStore';
import ListPage from '@/components/ListPage';
import Path from '@/components/Path';
import { Form } from '@/components/AntPlus';
import { useTableScrollX, useTableRenderNull } from '@/utils/hooks';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { NAME_SPACE, FTYPE_MAP } from '../constants';
import { IProps, ITableItem, ICreateParams } from '../type';

const { useState, useEffect } = React;

const DataTable = (props: IProps) => {
  const {
    tableList,
    form,
    tableListTotal,
    getTableList,
    updateModalData,
    serchParams
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const history = useHistory();
  const [pathList, setPathList] = useState([{ name: '赛事管理', link: '/gameManager' }, { name: '题目管理', link: '/gameTopicManager' }, { name: '裁判类型' }]);

  useEffect(() => {
    const params: any = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    props.updateQid(params.qid);
    setPathList([{ name: '赛事管理', link: '/gameManager' }, { name: `题目管理(${params.title})`, link: '/gameTopicManager' }, { name: '裁判类型' }]);
    getTableList();
    return () => {
      props.updateQid('');
    };
  }, []);


  /**
   * 退回
   */
  const handleBack = () => {
    history.goBack();
  };

  /**
   * 刷新列表
   */
  const handleRefresh = () => {
    getTableList();
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
   * 列表
   */
  const columns = useTableRenderNull([
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '裁判类型',
      dataIndex: 'jtype',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      render: (_: string, record: ITableItem) => {
        const { id } = record;
        return (
          <TableBtnGroup>
            <TableBtn onClick={() => { handleEdit(record); }}>修改</TableBtn>
          </TableBtnGroup>
        );
      },
    },
  ], []);


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
      title: '评分标准',
      dataIndex: 'title',
      width: 180,
    },
    {
      title: '评分内容',
      dataIndex: 'child',
      render: (child) => {
        console.log(child);
        return (
          <> {child.map((item: any) => {
            const { id, describe, maxscore } = item;
            return (
              <div>
                id:{`${id}`}、最大分值:{`${maxscore}`}、标准内容{`${describe}`}
              </div>
            );
          })}
          </>
        );
      }
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
    { otherBtnClick: handleRefresh, otherBtnName: '刷新' },
    { otherBtnClick: handleBack, otherBtnName: '返回' },
  ];

  return (
    <>
      <Path list={pathList} />
      <ListPage
        total={tableListTotal}
        hideFormSearch
        hasOtherBtn={hasOtherBtn}
        form={form} // 表单必须
        params={serchParams} // 表单域数据
        onSearch={getTableList} // 查询
        columns={columns} // Table 组件 `columns`
        rowKey='id' // table row 唯一标识，不是 `id` 时传入
        data={tableList} // 列表数据
        scroll={{ x: scrollX, y: 460 }}
        expandedRow={(opt: ITableItem) => (
          <Table
            bordered
            columns={columnsChild}
            dataSource={opt.jts}
            rowKey='id'
            pagination={false}
          />
        )}
        defaultExpandAllRows
        bordered
      />
    </>
  );
};
const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)(Form.create()(DataTable));
