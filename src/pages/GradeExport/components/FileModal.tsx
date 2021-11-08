import React, { useEffect, useMemo, useState } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Descriptions, Form, Icon, Input, InputNumber, Modal, Row, Table, Upload } from 'antd';
import { connect } from 'react-redux';
import { useTableRenderNull } from '@/utils/hooks';
import { get } from 'lodash';
import { NAME_SPACE, DATE_FORMAT } from '../constants';
import DetailContent from '../widget/DetailContent';
// import { formatCreateParams, formatItem } from '../adapter';
import { IProps, ITableItem, TWork, TWorkJudgeItem } from '../type';
import { serviceGetFile } from '../services';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


const FileModal = (props: IProps) => {
  const { modalFile } = props;
  const [fileInfo, setFileInfo] = useState<TWork | undefined>(undefined);
  /**
   * 取消
   */
  const handleCancel = () => {
    props.updateModalFile({ data: {}, show: false });
  };
  const handleView = (url: string) => {
    console.log(url);
    window.open(url, '_blank');
  };
  const fileColumns = useTableRenderNull([
    { title: '标题', dataIndex: 'title' },
    { title: '描述', dataIndex: 'describe' },
    {
      title: '查看',
      dataIndex: 'fpath',
      width: 100,
      render: (fpath: string) => (
        <Button.Group>
          <Button size='small' onClick={() => handleView(fpath)}>{fpath ? '查看' : '暂无'}</Button>
        </Button.Group>
      )
    },
  ], []);
  useEffect(() => {
    const wid = get(modalFile, ['data', 'wid'], '');
    serviceGetFile({ wid }).then((d: { work: TWork }) => {
      setFileInfo(d.work);
    }).catch(() => { });
  }, []);
  return (
    <div>
      <Modal
        style={{ top: '8%' }}
        width={1000}
        visible={modalFile.show}
        title='作品'
        onCancel={handleCancel}
        footer={null}
      >
        <Descriptions>
          <Descriptions.Item label='挑战号'>{fileInfo && fileInfo.tcode}</Descriptions.Item>
          <Descriptions.Item label='学校'>{fileInfo && fileInfo.school}</Descriptions.Item>
          <Descriptions.Item label='队伍名称'>{fileInfo && fileInfo.tname}</Descriptions.Item>
          <Descriptions.Item label='挑战题'>{fileInfo && fileInfo.title}</Descriptions.Item>
          <Descriptions.Item label='年龄组'>{fileInfo && fileInfo.age}</Descriptions.Item>
          {/* <Descriptions.Item label='队员姓名' span={3}>{fileInfo && Array.isArray(fileInfo.users) ? fileInfo.users.map(item => `${item.realname}、`) : '-'}</Descriptions.Item> */}
        </Descriptions>
        <h2>挑战题：{fileInfo && fileInfo.title}</h2>
        <Table
          columns={fileColumns}
          dataSource={fileInfo && fileInfo.needfiles ? fileInfo.needfiles : undefined}
          pagination={false}
          title={() => <h3>查看作品</h3>}
        />
      </Modal>
    </div>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)((Form.create<any>()(FileModal)));
