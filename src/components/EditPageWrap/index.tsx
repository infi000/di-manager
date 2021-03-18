import * as React from 'react';
import styled from 'styled-components';
export const EditPageWrap = styled.div`
  && {
    min-width: 1200px;
    background-color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    overflow: auto;
  }
`;

export const EditPageTop = styled.div`
  && {
    background-color: #fff;
    box-shadow: 0 2px 5px #0000002b;
    z-index: 999;
  }
`;
export const EditPageTitle = styled.div`
  && {
    padding: 20px;
    .ant-breadcrumb {
      span {
        color: #333;
        font-weight: 500;
      }

      span:last-child {
        .ant-breadcrumb-link {
          color: #999 !important;
          font-weight: 400;
        }
      }
    }
  }
`;
export const EditPageContent = styled.div`
  && {
    margin: 0 20px;
    padding: 20px 0;
    border-top: 1px solid #dddddd;
    overflow: hidden;
  }
`;
