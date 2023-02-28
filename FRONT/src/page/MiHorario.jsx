import { Button, Col, DatePicker, Divider, Form, message, Row, Select, Table, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Content, Item, TextApp } from '../assets/styles'
import 'dayjs/locale/es'
import esES from 'antd/lib/date-picker/locale/es_ES';
import esEST from 'antd/lib/time-picker/locale/es_ES';
import dayjs from 'dayjs';
import axios from 'axios'

const RowApp = styled(Row)`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #0b89dd71;
`

function MiHorario() {
  const [listMedicos, setListMedicos] = useState([])
  const [listHorario, setListHorario] = useState([])
  const [formHorario] = Form.useForm()

  const postNewHorario = (values) => {
    const day = values.day
    const [start, end] = values.range.map(element => element.format('HH:mm').split(":"))
    const fechaInicio = day.set('h', start[0]).set('m', start[1]).set('s',0).set('ms', 0).toISOString()
    const fechaFin = day.set('h', end[0]).set('m', end[1]).set('s',0).set('ms', 0).toISOString()
    const payload = {
      fechaInicio,
      fechaFin,
      medico_id: Number(values.medico)
    }
    axios({method: 'POST', url: 'horario', data: payload})
    .then(value => {
      message.success("Horario de atención registrado", 3)
      formHorario.resetFields()
      getHorarios()
    })
    .catch(error => {
      message.error(error.response.data.message, 3)
    })
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

  const getHorarios = () => {
    axios({method: 'GET', url: 'horario'})
    .then(({data}) => {
      const newData = [...data].map((element, i) => {
        element['key'] = i + 1
        return element
      })
      setListHorario(newData)
    })
    .catch()
  }

  useEffect(()=>{
    getMedicos()
    getHorarios()
  },[])

  const columns = [
    {
      key: 4,
      title: 'Medico',
      dataIndex: 'medic'
    },
    {
      key: 1,
      title: 'Dia',
      dataIndex: 'day',
      width: '150px'
    },
    {
      key: 2,
      title: 'Hora inicial',
      dataIndex: 'start',
      width: '90px'
    },
    {
      key: 3,
      title: 'Hora final',
      dataIndex: 'end',
      width: '80px'
    }
  ]

  return (
    <Content className='content_app'>
      <TextApp size={24} margin='30px 0 20px 0' fontweight='600' color="#4177d4">Gestionar horarios de atención</TextApp>
      <Form layout="vertical" form={formHorario} onFinish={postNewHorario}>
        <RowApp gutter={{ sm: 10 }} style={{marginBottom: '10px'}}>
          <Col xs={24} sm={6}>
            <Item label='Día' name='day' rules={[{required:true, message:'Campo requerido'}]}>
              <DatePicker locale={esES} style={{width:'100%'}} disabledDate={(c) => c < dayjs().endOf('day')}/>
            </Item>
          </Col>

          <Col xs={24} sm={6}>
            <Item label='Hora' name='range' rules={[{required:true, message:'Campo requerido'}]}>
              <TimePicker.RangePicker minuteStep={30} format='HH:mm' locale={esEST} placeholder={['Inicio','Fin']} />
            </Item>
          </Col>

          <Col xs={24} sm={7}>
            <Item label='Medico' name='medico' rules={[{required:true, message:'Campo requerido'}]}>
              <Select placeholder='Medico'>
                {listMedicos && listMedicos.map((element) => {
                  return <Select.Option key={element.key} value={element.id}>{`${element.nombre} ${element.apellido}`}</Select.Option>
                })}
              </Select>
            </Item>
          </Col>

          <Col xs={24} sm={5}>
            <Item label=' '>
              <Button type="primary" htmlType='submit' style={{width:'100%'}}>Crear</Button>
            </Item>
          </Col>
        </RowApp>
      </Form>
      <Divider orientation='left'>Horarios</Divider>
      <RowApp>
        <Col xs={24}>
          <Table size='small' columns={columns} dataSource={listHorario} pagination={false}/>
        </Col>
      </RowApp>
    </Content>
  )
}

export default MiHorario