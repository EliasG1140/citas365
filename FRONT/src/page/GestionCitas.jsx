import { Badge, Button, Col, DatePicker, Divider, Form, message, Modal, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Content, Item, LinkApp, TextApp } from '../assets/styles'
import 'dayjs/locale/es'
import esES from 'antd/lib/date-picker/locale/es_ES';
import * as dayjs from "dayjs";
import axios from 'axios'

const RowApp = styled(Row)`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #0b89dd71;
`

function GestionCitas() {
  const [listMedicos, setListMedicos] = useState([])
  const [listCitas, setListCitas] = useState([])

  const [modalAplazar, setModalAplazar] = useState(false)
  const [listCitasAplazar, setListCitasAplazar] = useState([])
  const [citaSelect, setCitaSelect] = useState()

  const [formFilter] = Form.useForm()
  const [formAplazar] = Form.useForm()
  const filterCitas = (value) => {
    const day = dayjs(value.day)
    const startDay = day.set('h', 0).set('m',0).set('s', 0).set('ms',0).toISOString()
    const endDay = day.set('h', 23).set('m',59).set('s', 59).set('ms',999).toISOString()
    const payload = {
      start: startDay,
      end: endDay,
      medico_id: value.medico_id
    }
    axios({method:'POST', url: 'cita/gestion', data: payload})
    .then(({data})=>{
      const newData = [...data].map((element, i) => {
        element['key'] = i + 1
        return element
      })
      setListCitas(newData)
      message.success("Citas agendadas: " + newData.length)
    })
    .catch(error => console.log(error))
  }

  const getCitas = (value) => {
    const day = dayjs(value.day)
    const startDay = day.set('h', 0).set('m',0).set('s', 0).set('ms',0).toISOString()
    const endDay = day.set('h', 23).set('m',59).set('s', 59).set('ms',999).toISOString()
    const payload = {
      start: startDay,
      end: endDay,
      medico_id: value.medico_id
    }
    axios({method:'POST', url: 'cita', data: payload})
    .then(({data})=>{
      const newData = [...data].map((element, i) => {
        element['key'] = i + 1
        return element
      })
      setListCitasAplazar(newData)
      message.success("Citas encontradas: " + newData.length)
    })
    .catch(error => console.log(error))
  }

  const getMedicos = () => {
    axios({method: 'GET', url: 'medico'})
    .then(({data})=>{
      const newData = [...data].map((element, i) => {
        element['key'] = i + 1
        return element
      })
      setListMedicos(newData)
    })
    .catch()
  }

  useEffect(()=>{
    getMedicos()
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

  const cancelCita = (value) => {
    axios({method:'GET', url: 'cita/cancelar/'+value})
    .then(({data})=>{
      message.success(data.message, 3)
      formFilter.submit()
    })
    .catch(error => {
      console.log(error);
    })
  }

  const confirmCita = (value) => {
    axios({method:'GET', url: 'cita/confirmar/'+value})
    .then(({data})=>{
      message.success(data.message, 3)
      formFilter.submit()
    })
    .catch(error => {
      message.error(error.response.data.message, 3)
    })
  }

  const apliazarCita = (values) => {
    const payload = {
      old: citaSelect,
      new: values
    }
    axios({method: 'POST', url: 'cita/aplazar', data:payload})
    .then(({data})=>{
      message.success(data.message, 3)
      setModalAplazar(false)
      setCitaSelect(null)
      formFilter.submit()
    })
    .catch(error => console.log(error))
  }

  const columns = [
    {
      key: 1,
      title: 'Paciente',
      dataIndex: 'paciente',
      render: (_, record)=> record.persona.nombre + " " + record.persona.apellido
    },
    {
      key: 1,
      title: 'Medico',
      dataIndex: 'medico',
      render: (_, record)=> record.medico.nombre + " " + record.medico.apellido
    },
    {
      key: 2,
      title: 'Fecha',
      dataIndex: 'fecha',
      width: '80px',
      render: (_, record)=> dayjs(record.fecha).format('DD/MM/YY')
    },
    {
      key: 3,
      title: 'Hora',
      dataIndex: 'hora',
      width: '20px',
      render: (_, record)=> dayjs(record.fecha).format('HH:mm')
    },
    {
      key: 3,
      title: 'Estado',
      dataIndex: 'estado',
      width: '120px',
      render: (_, record)=> badgeStatus(record.estado_id)
    },
    {
      key: 4,
      render: (_, record)=> (
        <div style={{display:'flex',gap:'5px'}}>
          <LinkApp onClick={()=> cancelCita(record.id)}>Cancelar</LinkApp>
          <LinkApp type="primary" onClick={()=> confirmCita(record.id)}>Confirmar</LinkApp>
          <LinkApp type="primary" onClick={()=> {
            setCitaSelect(record.id)
            setModalAplazar(true)
          }}>Aplazar</LinkApp>
        </div>
      ),
      width: '175px'
    }
  ]

  const columnAplazar = [
    {
      key:1,
      title: 'Día',
      render: (_, record)=> dayjs(record.fecha).format('DD/MM/YY')
    },
    {
      key:2,
      title: 'Hora',
      render: (_, record)=> dayjs(record.fecha).format('HH:mm')
    },
    {
      key:3,
      render: (_, record)=> <LinkApp onClick={()=> apliazarCita(record.id)}>Aplazar</LinkApp>
    },
  ]

  return (
    <Content className="content_app">
      <TextApp size={24} margin='30px 0 20px 0' fontweight='600' color="#4177d4">Gestionar citas</TextApp>
      <Form layout="vertical" onFinish={filterCitas} form={formFilter}>
        <RowApp gutter={{ sm: 10 }} style={{marginBottom: '10px'}}>
          <Col xs={24}>
            <TextApp size={16} margin='0 0 5px 0' color="#000">Filtrar por fecha:</TextApp>
          </Col>
          <Col xs={24} sm={8}>
            <Item label='Fecha' name="day" rules={[{required:true, message:'Campo requerido'}]}>
              <DatePicker locale={esES} style={{width:'100%'}} disabledDate={(c) => c < dayjs().endOf('day')}/>
            </Item>
          </Col>
          <Col xs={24} sm={8}>
            <Item label='Medico' name="medico_id" rules={[{required:true, message:'Campo requerido'}]}>
              <Select>
                {listMedicos && listMedicos.map((element) => {
                  return <Select.Option key={element.key} value={element.id}>{`${element.nombre} ${element.apellido}`}</Select.Option>
                })}
              </Select>
            </Item>
          </Col>
          <Col xs={24} sm={8}>
            <Item label=' '>
              <Button type="primary" htmlType="submit" style={{width:'100%'}}>Filtrar</Button>
            </Item>
          </Col>
        </RowApp>
      </Form>
      <Divider orientation="left">Citas</Divider>
      <RowApp>
        <Col xs={24}>
          <Table size="small" columns={columns} dataSource={listCitas} pagination={false}/>
        </Col>
      </RowApp>

      <Modal open={modalAplazar} onCancel={()=> setModalAplazar(false)}>
        <Form layout="vertical" onFinish={getCitas} form={formAplazar}>
          <RowApp gutter={{ sm: 10 }} style={{marginBottom: '10px'}}>
            <Col xs={24}>
              <TextApp size={16} margin='0 0 5px 0' color="#000">Buscar fecha disponible:</TextApp>
            </Col>
            <Col xs={24} sm={8}>
              <Item label='Fecha' name="day" rules={[{required:true, message:'Campo requerido'}]}>
                <DatePicker locale={esES} style={{width:'100%'}} disabledDate={(c) => c < dayjs().endOf('day')}/>
              </Item>
            </Col>
            <Col xs={24} sm={8}>
              <Item label='Medico' name="medico_id" rules={[{required:true, message:'Campo requerido'}]}>
                <Select>
                  {listMedicos && listMedicos.map((element) => {
                    return <Select.Option key={element.key} value={element.id}>{`${element.nombre} ${element.apellido}`}</Select.Option>
                  })}
                </Select>
              </Item>
            </Col>
            <Col xs={24} sm={8}>
              <Item label=' '>
                <Button type="primary" htmlType="submit" style={{width:'100%'}}>Filtrar</Button>
              </Item>
            </Col>
          </RowApp>
        </Form>
        <Table dataSource={listCitasAplazar} columns={columnAplazar} size='small' pagination={false}/>
      </Modal>
    </Content>
  )
}

export default GestionCitas