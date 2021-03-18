import * as React from 'react';
import styled from 'styled-components';
import { Icon, Button } from 'antd';
import { longanDispatchError } from 'longan-sdk';

const ErrorBox = styled.div`
  height: 88vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 5px 0;
    color: #999;
  }
  .error_icon {
    font-size: 100px;
    margin-bottom: 20px;
  }
  .refresh_btn {
    margin-left: 10px;
  }
`;

interface IState {
  hasError: boolean;
  // errorMessage: string;
  // errorInfo: any;
}

export interface IProps {
}

class ErrorBoundary extends React.Component<IProps, IState> {
  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
      // errorMessage: '',
      // errorInfo: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  public componentDidCatch(error: any, info: any) {
    // 错误上报
    this.setState({
      // errorMessage: error,
      // errorInfo: info,
    });
    try {
      longanDispatchError({
        error_message: error.toString(),
        error_content: error.stack,
        error_level: '0',
        error_tag: 'error_boundary'
      });
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public handleClick() {
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorBox>
          <Icon className='error_icon' type='exclamation-circle' theme='filled' />
          <h1>抱歉，系统暂时异常，请稍后再试</h1>
          <h1>
            您可以尝试
            <Button className='refresh_btn' type='primary' size='small' onClick={this.handleClick}>刷新</Button>
          </h1>
          <h1>若始终无法正常访问，请联系项目支持人员，感谢配合~</h1>
        </ErrorBox>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
