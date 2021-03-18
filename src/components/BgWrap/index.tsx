import styled from 'styled-components';
import { BG_URL, BG_COLOR } from '@/constants/index';

const Wrap = styled.div<{ bgUrl?: string ; bgColor?: string}>`
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    overflow:scroll;
    background-color:${props => props.bgColor || BG_COLOR};
    .container {
      position: absolute;
      top: 0;
      width: 1080px;
      left: 50%;
      transform: translate(-50%);
      height: 1980px;
      background-image: url(${props => props.bgUrl || BG_URL});
      background-repeat: no-repeat;
      background-size: contain;
    }  
`
export default Wrap;