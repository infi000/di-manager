import React, { useMemo } from 'react';
import withStore from '@/store/withStore';
import { Button, Col, DatePicker, Form, Icon, Input, InputNumber, Modal, Row, Upload } from 'antd';
import { connect } from 'react-redux';
import { NAME_SPACE, DATE_FORMAT } from '../constants';
// import { formatCreateParams, formatItem } from '../adapter';
import { IProps, ITableItem } from '../type';

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
  const { modalData, postSetCode, userInfo } = props;
  const { validateFields, getFieldDecorator } = props.form;


  /**
   * 取消
   */
  const handleCancel = () => {
    props.updateModalData({ data: {}, show: false });
  };
  /**
   * 新建/编辑
   */
  const handleOk = () => {
    validateFields((err, val) => {
      console.log(val);
      if (!err) {
        const pix =  userInfo.mtype == '2' ? '185-临' : '185-';
        const tcode = `${pix}${val.tcode}`;
        const tid = modalData.data;
        postSetCode({ tid, ...val,tcode});
      }
    });
  };
  return (
    <div>
      <Modal
        style={{ top: '8%' }}
        width={400}
        visible={modalData.show}
        title='设置队伍挑战号'
        onCancel={handleCancel}
        footer={(
          <Button className='cancel-button' onClick={handleOk}>
            提交
          </Button>
      )}
      >
        <Form className='sofa-modal-form' {...formItemLayout}>
          <Row>
            <Col span={24}>
              <Form.Item label='队伍挑战号'>
                {getFieldDecorator('tcode', {
                  rules: [{ required: true, message: '必填项' }],
                })(<Input addonBefore={userInfo.mtype == '2' ? '185-临' : '185-'} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

const injectStore: [] = withStore('basic', NAME_SPACE);

export default connect(...injectStore)((Form.create<any>()(CreateEditModal)));
