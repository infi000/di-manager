import React, { useEffect, useMemo, useState } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Icon, Input, InputNumber, Modal, Row, Table, Upload, Descriptions } from 'antd';
import { connect } from 'react-redux';
import { useTableRenderNull } from '@/utils/hooks';
import { get } from 'lodash';
import { NAME_SPACE, DATE_FORMAT } from '../constants';
// import { formatCreateParams, formatItem } from '../adapter';
import { ITableItem, TWorkJudgeItem } from '../type';
import { serviceGetDetail } from '../services';

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

interface IProps {
  data: TWorkJudgeItem;
}

const DetailContent = (props: IProps) => {
  const { data } = props;

  const columns = useTableRenderNull([
    {
      title: '题目',
      dataIndex: 'title',
      width: 80,
    },
    {
      title: '描述',
      dataIndex: 'describe',
      width: 120,
    },
    {
      title: '分数',
      dataIndex: 'score',
      width: 120,
    },
  ], []);


  return (
    <div style={{ padding: '20px' }}>
      <Descriptions style={{ marginBottom: '20px' }}>
        <Descriptions.Item label='评语'>{data.comment}</Descriptions.Item>
        <Descriptions.Item label='视频点评'><a href={data.videopath} target='_blank' rel='noreferrer'>查看</a></Descriptions.Item>
        <Descriptions.Item label='创建时间'>{data.ctime}</Descriptions.Item>
        <Descriptions.Item label='裁判姓名'>{data.uname}</Descriptions.Item>
      </Descriptions>
      <Table
        columns={columns}
        dataSource={data.wjudges}
        bordered
        pagination={undefined}
      />
    </div>
  );
};

export default DetailContent;
