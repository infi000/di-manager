import * as React from "react";
import styled from 'styled-components';

const Wrap = styled.a`
    margin-right:8px;
    display:inline-block;
    color: #165588;
`
interface IProps {
    children: string;
    power?: 1 | 0 ;
    onClick?: (params: any) => any;
    [key: string]: any;
}
const TableButton = (props: IProps) => {
    const { children, power = 1, onClick = () => { }, ...rest } = props;
    return <>{power === 1 ? <Wrap {...rest} onClick={onClick}>{children}</Wrap> : null} </>

}

export default TableButton;