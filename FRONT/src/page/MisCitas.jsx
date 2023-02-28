import { CloseOutlined } from '@ant-design/icons'
import { Badge, Button, Col, message, Row, Table } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Content, TextApp } from '../assets/styles'
import { AppContext } from '../context/AppContext'

const RowApp = styled(Row)`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #0b89dd71;
`

function MisCitas() {
  const { user } = useContext(AppContext)
  const [listCitas, setListCitas] = useState([])

  const getCitas = () => {
    axios({method: 'GET', url: 'cita/'+user.id })
    .then(({data})=>{
      const newData = [...data].map((element, i) => {
        element['key'] = i + 1
        return element
      })
      setListCitas(newData)
    })
    .catch(error => {
      console.log(error);
    })
  }

  const cancelCita = (value) => {
    axios({method:'GET', url: 'cita/cancelar/'+value})
    .then(({data})=>{
      message.success(data.message, 3)
      getCitas()
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(()=>{
    getCitas()
  },[])

  const badgeStatus = (value) => {
    if(value === 1) {
      return <Badge color='rgb(104, 104, 104)' text='Pendiente'/>
    }
    if(value === 2){
      return <Badge color='green' text='Confirmado'/>
    } 
    if(value === 3){
      return <Badge color='red' text='Cancelado'/>
    } 
    if(value === 4){
      return <Badge color='yellow' text='Aplazado'/>
    } 
  }

  const columns = [
    {
      title: 'Medico',
      dataIndex: 'medico',
      render: (_, record)=> record.medico.nombre + " " + record.medico.apellido
    },
    {
      title: 'Fecha',
      dataIndex: 'medico',
      render: (_, record)=> dayjs(record.fecha).format('DD/MM/YY'),
      width: '90px',
    },
    {
      title: 'Hora',
      dataIndex: 'medico',
      width: '60px',
      render: (_, record)=> dayjs(record.fecha).format('HH:mm')
    },
    {
      title: 'Estado',
      dataIndex: 'medico',
      width: '120px',
      render: (_, record)=> badgeStatus(record.estado_id)
    },
    {
      title: ' ',
      width: '20px',
      render: (_, record)=> record.estado_id === 1 && <Button type='primary' danger onClick={()=>cancelCita(record.id)}><CloseOutlined /></Button>
    }
  ]

  return (
    <Content className="content_app">
      <TextApp size={24} margin='30px 0 20px 0' fontweight='600' color="#4177d4">Mis citas</TextApp>
      <RowApp>
        <Col xs={24}>
          <Table size='small' columns={columns} dataSource={listCitas} pagination={false}/>
        </Col>
      </RowApp>
    </Content>
  )
}

export default MisCitas