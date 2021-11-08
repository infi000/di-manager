import React, { useState, forwardRef, useEffect } from 'react';
import { Upload, Button, Icon, message } from 'antd';
import fetch from '@/utils/fetch';
import qs from 'qs';
import { isArray, isString, random } from 'lodash';
import styled from 'styled-components';
import { HOST_SASS } from '@/constants';

const Wrap: any = styled.span`
  .ant-upload-list{    
    max-width: 700px;
    background: #fafafa;
    border: ${props => props.theme.border};
    margin: ${props => props.theme.margin};
    padding-bottom: ${props => props.theme.paddingBottom};
}`;

interface IProps {
  value: any[];
  onChange: Function;
  max: number;
  fileSize?: number;
  title?: string;
  [key: string]: any;
  isECP?: boolean;
}
const host = HOST_SASS; // 测试1
const renderFileName = (fileUrl: string) => {
  if (!fileUrl) {
    return '';
  }
  const deFileUrl = decodeURIComponent(fileUrl);
  const deFileUrlArr = deFileUrl.split('?');
  if (deFileUrlArr[1]) {
    const { 'file-name': file_name } = qs.parse(deFileUrlArr[1]);
    return file_name as string || '';
  }
  return '';
};

const Uploader = (props: IProps, ref: any) => {
  const { value, onChange, max = 1, title, isECP, fileSize = 1024, ...rest } = props;
  const { initialValue = [] } = props['data-__meta'];
  const [fileList, setFileList]: [any, any] = useState([]);
  const triggerChange = (fileListData: any[]) => {
    let format = [];
    if (onChange) {
      if (isECP) {
        format = ([...fileListData].length > 0)
          ? [...fileListData].map(item => {
            if (item.response && item.response.result) {
              return item.response.result;
            }
            return { id: item.id, name: item.name, cos_url: item.cos_url };
          }) : [];
      } else {
        format = ([...fileListData].length > 0) ? [...fileListData].map(item => item.url) : [];
      }
      console.log(format);
      console.log('fileListData',fileListData);
      onChange(format);
      setFileList([...fileListData]);
    }
  };
  // 上传之前
  const beforeUpload = (file: any) => {
    if (fileList.length > (max - 1)) {
      message.error(`最多支持上传${max}个附件!`);
      return false;
    }
    const isLt = file.size / 1024 / 1024 < fileSize;
    // 检查文件大小
    if (!isLt) {
      message.error(`文件大小不得超过${fileSize}MB!`);
      return false;
    }
    return true;
  };
  // 上传onChange
  const uploadOnChange = (info: any) => {
    let fileListData: any = [...info.fileList];
    // 上传错误时提示
    if (info.file.status === 'error' || !info.file.status) {
      message.error(`文件${info.file.name}上传失败！`);
      fileListData = [...fileListData].reduce((res, file) => {
        if (file.uid !== info.file.uid) {
          res.push({ ...file });
        }
        return res;
      }, []);
    }
    if (info.file.status === 'done') {
      console.log('info.file.======>', info.file);
      if ((Array.isArray(info.file.response.result)  && info.file.response.result.length === 0 )|| info.file.response.res !=='succ') {
        message.error(`${info.file.response.errmsg}！【logId: ${info.file.response.log_id}】`);
        fileListData = [...fileListData].reduce((res, file) => {
          if (file.uid !== info.file.uid) {
            res.push({ ...file });
          }
          return res;
        }, []);
      } else {
        message.success(`文件${info.file.name}上传成功！`);
        fileListData = [...fileListData].map((file: any) => {
          if (file.response && file.response.res === 'succ') {
            const newFile = { ...file, url: `${file.response.data}` };
            return newFile;
          }
          return file;
        });
      }
    }
    triggerChange(fileListData);
    // 设置file及file下载url
  };
  // 移除删掉的文件
  const uploadOnRemove = (file: any) => new Promise((resolve) => {
    triggerChange([]);
    resolve(true);
  });

  useEffect(() => {
    if (initialValue && isArray(initialValue)) {
      const format = initialValue.map((item: string | { url: string;[key: string]: string }, index: number) => {
        const status = 'done'; const response = { status: 'success' }; const uid = random(0, 100000000);
        let name: any = ''; let url = ''; let ecpItem = {};
        if (isString(item)) {
          name = renderFileName(item) || `附件${index + 1}`;
          url = item;
        } else {
          name = item.name || renderFileName(item.url) || `附件${index + 1}`;
          url = item.url;
          ecpItem = { ...item };
        }
        return {
          ...ecpItem, uid, name, status, response, url,
        };
      });
      setFileList((opt: any) => [...format, ...opt]);
    }
  }, [initialValue]);
  return (
    <Wrap ref={ref} theme={(isArray(fileList) && fileList.length > 0) ? { border: '1px solid #ccc', margin: '10px 0', paddingBottom: '10px' } : { border: 'none', margin: '0', paddingBottom: '0' }}>
      <Upload
        beforeUpload={beforeUpload}
        action='/index.php/AdminApi/Schedule/upload'
        fileList={fileList}
        onChange={uploadOnChange}
        onRemove={uploadOnRemove as any}
        withCredentials
        {...rest}
      >
        <Button type='primary'><Icon type='upload' />{title || '上传'}</Button>
      </Upload>
    </Wrap>
  );
};

export default forwardRef(Uploader);

export { renderFileName };
