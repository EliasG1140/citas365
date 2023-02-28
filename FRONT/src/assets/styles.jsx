import { Form, Modal, Progress, Typography } from "antd";
import styled from "styled-components";

export const Item = styled(Form.Item)`
  margin-bottom: ${props => props.mb ? props.mb : 15}px;
  & .ant-form-item-label {
    padding-bottom: 5px;
  }

  // Control borders inputs when is InpurGroup
  ${({compactleft}) => compactleft && `
    & input, .ant-select-selector, .ant-input-number, .ant-input-affix-wrapper {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }    
  `}

  ${({compactcenter}) => compactcenter && `
    & input, .ant-select-selector, .ant-input-number, .ant-input-affix-wrapper{
      border-radius: 0px;
    }
  `}

  ${({compactright}) => compactright && `
    & input, .ant-select-selector, .ant-input-number, .ant-input-affix-wrapper{
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px
    }
  `}

`

export const LinkApp = styled.a`
  display: ${props => props.display ? props.display : 'block'};
  text-align: ${props => props.align ? props.align : 'left'};
  margin-bottom: ${props => props.mb ? props.mb : 0}px;
  font-size: ${props => props.size ? props.size : 13}px;
  font-style: normal;
  &:hover {
    text-decoration: underline;
  }
`

export const TextApp = styled.p`
  text-align: ${props => props.align ? props.align : 'left'};
  font-size: ${props => props.size ? props.size : 14}px;
  color: ${props => props.color ? props.color : '#8391a2'};
  font-style: ${props => props.fontstyle ? props.fontstyle : 'normal'};
  padding: ${props => props.padding ? props.padding : '0' };
  font-weight: ${props => props.fontweight ? props.fontweight : 'normal' };
  margin: ${props => props.margin ? props.margin : '0px'};
  line-height: 16px;
  width: auto;
`

export const Content = styled.div`
  padding-top: 15px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`