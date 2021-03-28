/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Modal, Row, Col, Icon, Popconfirm } from 'antd';
import { Form } from '@/components/AntPlus';
import { listPage } from './index.scss';
/**
 * ListPage - 列表页通用组件
 *
 * @param {string} [className] - 自定义 className
 * @param {boolean} power - 权限数据 e.g.
 * @param {object} history - withRouter 注入的 `history`
 * @param {object} [btnAdd] - `新建` 按钮数据 e.g. { name: '新建XXX', path: 'xxx/add' }
 * @param {node} [pageFooter] - 显示在页面底部的元素，默认居右
 *
 * Form
 * @param {object} form - Form.create() 注入的 `form` 对象
 * @param {array} fields - 表单组件集合 (若表单域 id 为 `ignore` 开头，则不收集表单域的值)
 * @param {object} params - 表单数据
 * @param {function} onSearch - 根据筛选项查询
 * @param {node} formFooter - 其它节点
\ * @param {boolen} hideFormSearch - 不展示formSearch
\ *
 * Table
 * @param {function} getList - 获取 Table 数据
 * @param {object} listLoading - 获取 `data` 时的 loading
 * @param {array} columns - Table 组件 `columns`
 * @param {string} [rowKey] - 表格行的唯一标识，默认为 `id`，如有其它情况可传入
 * @param {object} [rowSelection] - 选择功能的配置
 * @param {array} data - Table 组件 `dataSource`
 * @param {node} tableFooter - 表格尾部
 * @param {number} total - 列表条目总数
 * @param {function} onNav - 切换分页时的回调函数 page => void
 * @param {object} scroll - 横向或纵向滚动 e.g. { x: number, y: number }
 *
 * Modal
 * @param {boolen} hasExport - 是否展示导出按钮
 * @param {boolen} hasExportModal - 是否展示导出弹窗 - 展示导出信息的内容
 * @param {function} exportFunc - 执行确定导出
 * @param {function} exportBody - 返回弹窗展示内容
 * @param {function} hasDesensitExport - 是否展示脱敏导出弹窗
 * @param {function} onDesensiExportOk - 脱敏导出弹窗 ok
 * @param {function} onDesensiExportCancel - 脱敏导出弹窗 cancel
 * @param {string} exportBillName -脱敏导出弹窗 账单信息展示
 *
 *
 * Button 其他按钮
 * @param {object} [hasOtherBtn] - `导出账单` 按钮数据 e.g. { otherBtnName: '导出账单', otherBtnClick: xxxx }
 * [
 *  [{ name: '', value; '' }, { name: '', value; '' }], // 每行展示两个
 *  [{ name: '', value; '' }]                           // 每行展示一个
 * ]
 */
class ListPage extends Component {
  constructor(props) {
    super(props);
    const { btnAdd } = props;
    this.showBtnAdd = Boolean(btnAdd);
    this.state = {
      exportVal: {},
      isShow: true,
      otherHeight: 0,
    };
  }
  componentDidMount() {
    const { history, } = this.props;
    const $contentBody = document.getElementsByClassName('ant-layout-content') ? document.getElementsByClassName('ant-layout-content')[0] : '';
    const $formBody = document.getElementsByClassName('list-page-form') ? document.getElementsByClassName('list-page-form')[0] : '';
    if ($contentBody && $formBody) {
      this.setState({
        otherHeight: $contentBody.clientHeight - $formBody.clientHeight - 120
      });
    } else {
      this.setState({
        otherHeight: 520
      });
    }

    if (history !== undefined) {
      const { pathname: curPath } = history.location;
      history.listen(({ pathname: nextPath }) => {
        if (new RegExp(`^${curPath}`).test(nextPath)) {
          this.notReset = true;
        }
      });
    }
  }


  // 提交表单
  onSubmit = (isExport) => {
    const { form, exportFunc, onSearch } = this.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (err) return;
      Object.keys(values).forEach((key) => {
        if (/^ignore/.test(key)) delete values[key];
      });
      // 搜索
      if (!isExport) {
        onSearch({ ...values });
        return;
      }else{
        exportFunc(values);
      }
    });
  };

  // 分页展示总页数
  showTotal = () => {
    const { total } = this.props;
    return `共${total}条`;
  };
  hiddenSearch = () => {
    const { isShow } = this.state;
    this.setState({
      isShow: !isShow,
    });
  };
  onShowSizeChange = (current, size) => {
    console.log('current, size', current, size);
    const { onSearch, form } = this.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (err) return;
      Object.keys(values).forEach((key) => {
        if (/^ignore/.test(key)) delete values[key];
      });
      // 搜索
      onSearch({ ...values, page_no: 0, page_size: size });
    });
  };
  render() {
    const { isShow, otherHeight } = this.state;
    const {
      className,
      btnAdd,
      pageFooter,
      // Form
      form,
      fields = <></>,
      params,
      pageInfo={},
      formFooter,
      hideFormSearch,
      // Table
      listLoading,
      columns,
      rowKey = 'id',
      rowSelection,
      data,
      tableFooter,
      total,
      onNav,
      scroll,
      expandedRow,
      defaultExpandAllRows,
      bordered,
      // hasOtherBtn 除搜索和重置按钮的其他按钮🔘
      hasOtherBtn,
    } = this.props;
    if (scroll && scroll.y) {
      scroll.y = otherHeight;
    }
    const tableProps = () => {
      const propsObj = {
        loading: listLoading,
        columns,
        rowKey,
        rowSelection,
        dataSource: data,
        footer: tableFooter,
        scroll,
        defaultExpandAllRows,
        bordered,
        size: 'small',
      };
      // antd中 table中expandedRowRender与scroll不可同时使用
      if (expandedRow) {
        propsObj.expandedRowRender = expandedRow;
        delete propsObj.scroll;
        return propsObj;
      }
      return propsObj;
    };
    return (
      <div className={[listPage, className].join(' ')}>
        <div className="page-header">
          {this.showBtnAdd && (
            <Button className="btn-light" onClick={btnAdd.click ? btnAdd.click : null}>
              <Link to={btnAdd.path ? btnAdd.path : '#'}>{btnAdd.name}</Link>
            </Button>
          )}
        </div>
        <Form
          style={!isShow ? { display: 'none' } : {}}
          className="list-page-form"
          api={form}
          onSubmit={() => this.onSubmit(false)}
          fields={[fields].concat(
            <>
            {!hideFormSearch &&  <footer>
                {this.props.hideSearch ? null : <Button htmlType="submit">{this.props.searchName ? this.props.searchName : '搜索'}</Button>}
                {formFooter}
              </footer>}
              <footer
                style={{
                  justifyContent: 'flex-end',
                  width: '100%',
                  borderTop: '1px solid #e8e8e8',
                  paddingTop: '12px',
                }}
              >
                {hasOtherBtn &&
                  hasOtherBtn.map((item, index) => {
                    const { power = 1 } = item;
                    if (item.hasPopconfirm) {
                      return power === 1 && (<Popconfirm key={index} placement='topLeft' title={item.title} onConfirm={item.otherBtnClick} okText='确定' cancelText='取消'>
                        <Button>{item.otherBtnName}</Button>
                      </Popconfirm>);
                    }
                    return (power === 1 && <div key={index}>
                      <Button onClick={item.otherBtnClick}>{item.otherBtnName}</Button>
                    </div>);
                  })}
              </footer>
            </>,
          )}
          data={params}
        />

        <Table
          {...tableProps()}
          pagination={true?{
            current: pageInfo.page_no, // 后端初始页数为 0，所以前端展示时需要加 1
            pageSize: pageInfo.page_size || 1000,
            total,
            showTotal: this.showTotal,
            onChange: onNav,
          }:undefined}
        />
        {pageFooter && <footer className="footer">{pageFooter}</footer>}
      </div>
    );
  }
}

export default ListPage;

            {/* pageSizeOptions: this.props.hideSearch ? ['20'] : ['20', '50', '100'],
            onShowSizeChange: this.props.hideSearch ? () => {} : this.onShowSizeChange */}