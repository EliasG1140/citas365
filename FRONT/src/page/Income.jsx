import { Button, Form, Input, Layout, Typography } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import FormLogin from '../components/FormLogin'
import FormRegister from '../components/FormRegister'
import bg from './../assets/bg.jpg'
import srcLogo from './../assets/logo.svg'

const { Text } = Typography;

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
`

const ContentForm = styled.div`
  min-width: 260px;
  
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #4ad0e237;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 5px 0px #210b9c14;
`

const Logo = styled.img`
  width: 100px;
`

const Title = styled(Text)`
  margin-bottom: 8px;
  color: #4177d4;
  font-size: 20px;
  font-weight: 500;
`

function Income() {
  const [controlForm, setControlForm] = useState(0)
  const title = ["¡Hola, bienvenido!","Crear una cuenta"]

  return (
    <Content>
      <ContentForm>
        <Logo src={srcLogo} alt="" />
        <Title>{title[controlForm]}</Title>
        <FormLogin focus={controlForm === 0} handleControl={setControlForm} />
        <FormRegister focus={controlForm === 1} handleControl={setControlForm} />
      </ContentForm>
    </Content>
  )
}

export default Income