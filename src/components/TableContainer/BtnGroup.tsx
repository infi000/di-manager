import * as React from "react";
import styled from 'styled-components';

const Wrap = styled.div`
   max-width:400px;
`
interface IProps {
    children: React.ReactNode;
  
}
const BtnGroup = (props: IProps) => {
    const { children } = props;
    return <Wrap>{children}</Wrap>

}

export default BtnGroup;