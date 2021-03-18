// 验证构建版本是否和当前版本一致。如果有新版本发行，提示用户刷新
import { get } from 'lodash';
import { Modal } from 'antd';
import { ModalFunc } from 'antd/lib/modal/Modal';
// import safeFetch from './fetch';

export const getBuildVersion = () => fetch(`/static/version/buildVersion.json?v=${new Date().getTime()}`).then(d => d.json());
const LOOP_TIME = 60000;
interface IVersionInfo {
  commit: string;
  commitUserName: string;
  commitUserMail: string;
  commitDate: string;
  buildUserName: string;
  buildUserMail: string;
  buildDate: string;
}
class BuildVersion {
  static instance: BuildVersion;

  info: IVersionInfo;

  modal: ModalFunc | false | undefined;

  constructor(versionInfo: IVersionInfo) {
    this.info = versionInfo;
  }

  static getInstance(versionInfo: IVersionInfo) {
    if (!this.instance) {
      this.instance = new BuildVersion(versionInfo);
    }
    return this.instance;
  }

  init = () => {
    this.checkVersion();
  }

  checkVersion = () => {
    setTimeout(() => {
      getBuildVersion().then((d: any) => {
        const commit = get(d, ['data', 'commit'], '');
        const buildDate = get(d, ['data', 'buildDate'], '稍早前');
        if (commit !== this.info.commit) {
          this.alert(buildDate);
        } else {
          this.checkVersion();
        }
      }).catch((err: any) => {
        this.checkVersion();
      });
    }, LOOP_TIME);
  }

  alert = (buildDate: string) => {
    if (!this.modal) {
      this.modal = Modal.confirm;
      this.modal({
        icon: 'alert',
        title: '发现新版本',
        content: `新版本于${buildDate}发布，请及时刷新浏览器`,
        okText: '刷新',
        cancelText: '再等等',
        onCancel: () => {
          this.checkVersion();
          this.modal = false;
        },
        onOk: () => {
          window.location.reload(true);
        }
      });
    }
  }
}

export default BuildVersion;
