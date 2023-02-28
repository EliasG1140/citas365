import { Button, Col, DatePicker, Divider, Form, message, Row, Select, Table, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Content, Item, TextApp } from "../assets/styles";
import 'dayjs/locale/es'
import esES from 'antd/lib/date-picker/locale/es_ES';
import * as dayjs from "dayjs";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const RowApp = styled(Row)`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #0b89dd71;
`

function SolicitarCitas() {
  const { user } = useContext(AppContext)
  const [listMedicos, setListMedicos] = useState([])
  const [listCitas, setListCitas] = useState([])
  const [formFilter] = Form.useForm()

  const filterCitas = (value) => {
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
      setListCitas(newData)
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

  const postAgendar = (values) => {
    const payload = {
      cita_id: values.id,
      username: user.username
    }
    axios({method: 'POST', url: 'cita/agendar', data: payload})
    .then(({data}) => {
      message.success(data.message, 3)
      formFilter.submit()
    })
    .catch(error => {
      message.error(error.response.data.message, 3)
    })
  }

  useEffect(()=>{
    getMedicos()
  })

  const columns = [
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
      width: '150px',
      render: (_, record)=> dayjs(record.fecha).format('DD/MM/YYYY')
    },
    {
      key: 3,
      title: 'Hora',
      dataIndex: 'hora',
      width: '20px',
      render: (_, record)=> dayjs(record.fecha).format('HH:mm')
    },
    {
      key: 4,
      render: (_, record)=> <Button type="primary" onClick={()=> postAgendar(record)}>Agendar</Button>,
      width: '20px'
    }
  ]
  return (
    <Content className="content_app">
      <TextApp size={24} margin='30px 0 20px 0' fontweight='600' color="#4177d4">Solicitar citas</TextApp>
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
    </Content>
  );
}

export default SolicitarCitas;