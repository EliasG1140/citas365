import { Badge, Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { TextApp } from '../assets/styles'

const ContentRow = styled.div`
  background-color: #fff;
  border: 1px solid #c7c7c790;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`


function RowCita() {
  return (
    <ContentRow>
      <ContentInfo>
        <TextApp color='#4177d4' fontweight='bold' size={16}>Medico:</TextApp>
        <TextApp color='#000'>Jaime Elias Garcia Alvarado</TextApp>
      </ContentInfo>

      <ContentInfo>
        <TextApp color='#4177d4' fontweight='bold' size={16}>Fecha:</TextApp>
        <TextApp color='#000'>21 de Enero del 2022</TextApp>
      </ContentInfo>

      <ContentInfo>
        <TextApp color='#4177d4' fontweight='bold' size={16}>Hora:</TextApp>
        <TextApp color='#000'>12:30 PM</TextApp>
      </ContentInfo>

      <Button type='primary'>Agendar</Button>
    </ContentRow>
  )
}

export default RowCita