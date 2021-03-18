import React from 'react';

const iframeUrl = (process.env.PROJECT_ENV === 'online') ?
  'https://otms.sf-express.com' : 'http://uat-ji.sftcwl.com.cn';

console.log('process.env.PROJECT_ENV: ', process.env.PROJECT_ENV);
const IframeContainer = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
      id = 'iframe'
      name = 'IframeContainer'
      src = {`${iframeUrl}${props.url}`}
      scrolling = 'auto'
      style = {{
        width: 'calc(100% - 40px)',
        height: 'calc(100% - 20px)',
        border: 'none',
        position: 'absolute',
      }}
    />
  );
};

export default IframeContainer;
