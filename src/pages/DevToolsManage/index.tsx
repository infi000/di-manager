import * as React from 'react';
import {
  EditPageTop,
  EditPageWrap,
  EditPageTitle,
  EditPageContent,
} from '@/components/EditPageWrap';
import { message, Button } from 'antd';
import styled from 'styled-components';

const { useState } = React;
const ButtonWrap = styled.div`
  display:inline-block;
  margin-right:8px;
`;

const UA = navigator.userAgent;
const DevToolsManage = () => {
  const [cookieInfo, setCookieInfo] = useState(() => document.cookie);
  const cleanCookie = () => fetch('/ui/mc/clearlogincookie');
  const logout = () => fetch('/ui/mc/loginout');
  const handleClean = async () => {
    try {
      const res = cleanCookie();
      const res2 = logout();
      await res;
      await res2;
      setCookieInfo(document.cookie);
      message.success('清除完成');
    } catch (error) {
      message.error('接口调用失败');
    }
  };
  const handleLogout = () => {
    window.location.href = '/pass/logout';
  };
  return (
      <EditPageWrap>
        <EditPageTop>
          <EditPageTitle>开发者页面</EditPageTitle>
        </EditPageTop>
        <EditPageContent>
          <div>浏览器信息：{UA}</div>
          <div>前端注入cookie信息：{cookieInfo}</div>
          <ButtonWrap> <Button onClick={handleClean}>清除接口缓存</Button></ButtonWrap>
          <ButtonWrap> <Button onClick={handleLogout}>返回登陆页面</Button></ButtonWrap>
        </EditPageContent>
      </EditPageWrap>
  );
};

export default DevToolsManage;
