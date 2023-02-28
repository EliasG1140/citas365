import { Button, Col, Form, Input, InputNumber, message, Row, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Item, LinkApp, TextApp } from "../assets/styles";
const Content = styled.div`
  min-width: 260px;
  max-width: 360px;
  opacity: ${(props) => (props.focus ? 1 : 0)};
  display: ${(props) => (props.focus ? "block" : "none")};
  @media (max-width: 575px) {
    width: 260px;
  }
`;

function FormRegister({ focus, handleControl }) {
  const [listIdentification, setListIdentification] = useState([]);
  const [formRegister] = Form.useForm();

  const getIndentification = () => {
    axios({ method: "GET", url: "persona/tipo_identificacion" })
      .then(({ data }) => {
        const newData = [...data].map((element, i) => {
          element["key"] = i + 1;
          return element;
        });
        setListIdentification(newData);
      })
      .catch();
  };

  const postRegister = (value) => {
    const persona = {
      ...value,
      numero_identificacion: `${value.numero_identificacion}`
    }
    delete persona['username_register']
    delete persona['password_register']

    const payload = {
      username: value.username_register,
      password: value.password_register,
      persona
    }
    axios({method: 'POST', url: 'auth/register', data: payload})
    .then(({data}) => {
      message.success('Usuario registrado correctamente', 3)
      formRegister.resetFields()
      handleControl(0)
    })
    .catch(error => {
      message.error(error.response.data.message, 3)
    })
  }

  useEffect(() => {
    if (listIdentification.length === 0) {
      getIndentification();
    }
  }, [listIdentification]);

  return (
    <Content focus={focus}>
      <Form layout="vertical" form={formRegister} onFinish={postRegister} autoComplete="off">
        <Row gutter={{ sm: 10 }}>
          <Col xs={24} sm={12}>
            <Item mb={5} label="Nombre" rules={[{required: true, message:'Campo requerido'}]} name="nombre">
              <Input />
            </Item>
          </Col>

          <Col xs={24} sm={12}>
            <Item mb={5} label="Apellido" rules={[{required: true, message:'Campo requerido'}]} name="apellido">
              <Input />
            </Item>
          </Col>

          <Col xs={24} sm={12}>
            <Item mb={5} label="Tipo de identificación" rules={[{required: true, message:'Campo requerido'}]} name='tipo_id'>
              <Select>
                {listIdentification && listIdentification.map((element) => {
                  return <Select.Option key={element.key} value={element.id}>{element.nombre}</Select.Option>
                })}
              </Select>
            </Item>
          </Col>

          <Col xs={24} sm={12}>
            <Item mb={5} label="Numero de identificación" rules={[{required: true, message:'Campo requerido'}]} name='numero_identificacion'>
              <InputNumber style={{ width: "100%" }} controls={false}/>
            </Item>
          </Col>

          <Col xs={24} sm={12}>
            <Item mb={5} label="Nombre de usuario" rules={[{required: true, message:'Campo requerido'}]} name="username_register">
              <Input minLength={5} maxLength={10}/>
            </Item>
          </Col>

          <Col xs={24} sm={12}>
            <Item label="Contraseña" rules={[{required: true, message:'Campo requerido'}]} name="password_register">
              <Input.Password />
            </Item>
          </Col>

          <Col xs={24} sm={24}>
            <Item mb={5} rules={[{required: true, message:'Campo requerido'}]}>
              <Button style={{ width: "100%" }} type="primary" htmlType="submit">Crear cuenta</Button>
              <TextApp fontstyle='italic' align="center">¿Ya tienes una cuenta?{" "}<LinkApp display="inline" onClick={() => {
                formRegister.resetFields();
                handleControl(0);
              }}>Iniciar sesión</LinkApp>
              </TextApp>
            </Item>
          </Col>
        </Row>
      </Form>
    </Content>
  );
}

export default FormRegister;
