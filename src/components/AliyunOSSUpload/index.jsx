/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Upload, message, Button, Icon,
} from 'antd';
import CryptoJS from 'crypto-js';
import Base64 from 'base-64';

// eslint-disable-next-line prefer-destructuring
const PROJECT_ENV = process.env.PROJECT_ENV;

const OSS_HOST = 'http://di202104game.oss-cn-hangzhou.aliyuncs.com';
const OSS_DIR = 'sass/';
const OSS_API = '/ossupload';
const accessId = 'LTAI5tRD67AGZKao5feBZEEw';
const accesskey = 'y3dQyspAqBFWCIR9AbzZtxNVJeCjIA';
const policyText = {
  expiration: '2030-01-01T12:00:00.000Z', // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
  conditions: [
    ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
  ],
};
const policyBase64 = Base64.encode(JSON.stringify(policyText));
const bytes = CryptoJS.HmacSHA1(policyBase64, accesskey, { asBytes: true });
const signature = bytes.toString(CryptoJS.enc.Base64);
const TYPE_MAP = {
  1: '.mp4',
  2: '.pdf',
  3: '.jpg, .jpeg, .png',
};


class AliyunOSSUpload extends React.Component {
  state = {
    OSSData: {},
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    try {
      const OSSData = await this.mockGetOSSData();

      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
  mockGetOSSData = () => ({
    dir: OSS_DIR,
    expire: '1577811661',
    // eslint-disable-next-line @typescript-eslint/camelcase
    success_action_status: '200', // 让服务端返回200,不然，默认会返回204
    host: OSS_HOST,
    accessId,
    policy: policyBase64,
    signature,
  });

  onChange = ({ file, fileList }) => {
    const { onChange } = this.props;
    const url = `${`${OSS_HOST}/${file.url}?filrname=${file.name}`}`;
    file.ossUlr = url;
    if (onChange) {
      onChange([file]);
    }
  };

  onRemove = (file) => {
    const { value, onChange } = this.props;

    const files = value.filter(v => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  transformFile = (file) => {
    const { OSSData } = this.state;

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = OSSData.dir + filename;

    return file;
  };

  getExtraData = (file) => {
    const { OSSData } = this.state;

    return {
      key: file.url,
      OSSAccessKeyId: OSSData.accessId,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  beforeUpload = async (file) => {
    const { OSSData } = this.state;
    const { value } = this.props;
    const expire = OSSData.expire * 1000;
    // return false;
    // // if (value.length === 0) {
    // //   this.setState(state => ({
    // //     value: [...state.value, file],
    // //   }));
    // // } else {
    // //   message.error('只能上传一个文件');
    // //   this.setState(state => ({
    // //     value: [...state.value],
    // //   }));
    // //   return false;
    // // }
    if (expire < Date.now()) {
      await this.init();
    }

    return true;
  };

  render() {
    const { value, ftype } = this.props;
    const { state } = this;
    const accept = TYPE_MAP[ftype] || '';
    const props = {
      name: 'file',
      fileList: value,
      action: state.OSSData.host,
      onChange: this.onChange,
      onRemove: this.onRemove,
      transformFile: this.transformFile,
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      multiple: false,
      accept,
    };
    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload" />
          {' '}
          点击上传
        </Button>
      </Upload>
    );
  }
}

export default AliyunOSSUpload;

// class FormPage extends React.Component {
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <Form onSubmit={this.handleSubmit} labelCol={{ span: 4 }}>
//         <Form.Item label="Photos">{getFieldDecorator('photos')(<AliyunOSSUpload />)}</Form.Item>
//       </Form>
//     );
//   }
// }

// const WrappedFormPage = Form.create()(FormPage);

// ReactDOM.render(<WrappedFormPage />, mountNode);
