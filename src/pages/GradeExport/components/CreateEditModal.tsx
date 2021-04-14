import React, { useEffect, useMemo, useState } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Icon, Input, InputNumber, Modal, Row, Table, Upload } from 'antd';
import { connect } from 'react-redux';
import { useTableRenderNull } from '@/utils/hooks';
import { get } from 'lodash';
import { NAME_SPACE, DATE_FORMAT } from '../constants';
import DetailContent from '../widget/DetailContent';
// import { formatCreateParams, formatItem } from '../adapter';
import { IProps, ITableItem, TWorkJudgeItem } from '../type';
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


const CreateEditModal = (props: IProps) => {
  const { modalData } = props;
  const [list, setList] = useState<TWorkJudgeItem[]>([]);
  /**
   * 取消
   */
  const handleCancel = () => {
    props.updateModalData({ data: {}, show: false });
  };

  useEffect(() => {
    const tid = get(modalData, ['data', 'tid'], '');
    serviceGetDetail({ tid }).then((d: { workjudges: TWorkJudgeItem[] }) => {
      setList(d.workjudges || []);
    }).catch(()=>{});
  }, []);
  return (
    <div>
      <Modal
        style={{ top: '8%' }}
        width={1000}
        visible={modalData.show}
        title='详情'
        onCancel={handleCancel}
        footer={null}
      >
        {
          list.map(item => <DetailContent key={item.id} data={item} />)
        }
      </Modal>
    </div>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)((Form.create<any>()(CreateEditModal)));
