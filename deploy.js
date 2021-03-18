// eslint-disable-next-line import/no-extraneous-dependencies
const deploy = require('eden-remote-deploy');

const deployCfg = {
    douyanbin: {
        receiver: 'http://10.188.40.51:1080/receiver.php',
        root: '/home/sftcwl/fohs/',
    },
    zhangchiyang: {
        receiver: 'http://10.59.55.105:90/receiver.php',
        root: '/Users/sf/webroot/'
    },
    fangchunyan: {
        receiver: 'http://10.188.40.130:8129/receiver.php',
        root: '/home/sftcwl/fohs8139/slb/'
    },
    tiantong: {
        receiver: 'http://10.188.40.132:8137/receiver.php',
        root: '/home/sftcwl/fohs/',
    },
    zhangyi: {
        receiver: 'http://10.188.40.105:8137/receiver.php',
        root: '/home/sftcwl/fohs/',
    },
    fangjuanhong: {
        receiver: 'http://10.188.40.238:8129/receiver.php',
        root: '/home/sftcwl/fohs8139/',
    },
};

const edenCfg = [{
  from: 'build/**',
  to: 'html/',
}];

const hostName = process.argv[2];// 捕获机器名字

if (hostName && deployCfg[hostName]) {
  // eslint-disable-next-line
  const receiver = deployCfg[hostName].receiver;
  console.info('==>   Receiver:', receiver);

  deploy(edenCfg, receiver, deployCfg[hostName].root);
} else {
  console.error('==>   请输入正确的部署机器名');
}
