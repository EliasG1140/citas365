import React from 'react'
import styled from 'styled-components'
import { TextApp } from '../assets/styles'

const ButtonContent = styled.button`
  height: 55px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3881FF;
  padding: 0 10px;
  color: white;
  gap: 7px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  &:hover {
    background-color: #2e71e6;
  }
`

const ContentIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: auto;
  & span {
    font-size: 20px;
    width: 20px;
  }
`

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 55px;
`

function ButtonMenu({icon, text, bold, onClick}) {
  return (
    <ButtonContent onClick={onClick}>
      {icon && <ContentIcon>{icon}</ContentIcon>}
      <ContentInfo>
        {text && <TextApp color='#fff' size='14'>{text}</TextApp>}
        {bold && <TextApp color='#fff' size='16' fontweight='bold'>{bold.toUpperCase()}</TextApp>}
      </ContentInfo>
    </ButtonContent>
  )
}

export default ButtonMenu