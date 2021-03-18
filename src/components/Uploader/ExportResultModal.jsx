import React from 'react';
import { Button, Modal, Progress, Icon } from 'antd';
import styles from './index.scss';

/**
 *
 * @param {function} onOk  - ok按钮方法
 * @param {function} onCancel  - cancel按钮方法
 * @param {object} result  - 上传结果状态
 */
const ExportResultModal = (props) => {
  const { onOk, onCancel, result, importType, isOTMS } = props;
  const { status, result_info = {}, error_info_url = null } = result;

  const handleDownload = (url) => {
    if (url) {
      window.open(url);
    }
  };
  const handleOk = () => {
    onOk();
  };
  const handleCancel = () => {
    onCancel();
  };

  console.log(importType);
  return (
    <>
      <Modal
        title="上传进度"
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        visible
        keyboard={status === 'success'}
        maskClosable={false}
        closable={status === 'success'}
        className={styles.modal}
      >
        {status !== 'success' && (
          <div className="box">
            <div className="middle">上传进行中，请勿关闭当前页面，否则上传数据将丢失。</div>
            <Progress
              percent={100}
              status="active"
              strokeWidth={20}
              showInfo={false}
              strokeColor="#333"
              className="progress"
            />
            <div className="middle">上传中...</div>
          </div>
        )}
        {(!isOTMS && status === 'success') || (status === 'success' && isOTMS && (result_info && result_info.error_total) && importType === 1) || (status === 'success' && isOTMS && importType === 2) ? (
          <div className="detail">
            <Icon type="check-circle" className="check_icon" />
            <div className="middle_detail">
            <span className="left">上传成功：{result_info && result_info.success_total ? result_info.success_total : '-'}条</span>
              <span className="left">上传失败：{result_info && result_info.error_total ? result_info.error_total : '-'}条</span>
              <Button type="primary" onClick={() => handleDownload(error_info_url)} className="btn">
                下载上传失败明细
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
};
// disabled={!fileStatus.download_url}

export default ExportResultModal;
