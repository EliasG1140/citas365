import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Item, LinkApp, TextApp } from '../assets/styles'
import { AppContext } from '../context/AppContext'

const Content = styled.div`
  width: 260px;
  opacity: ${props => props.focus ? 1 : 0};
  display: ${props => props.focus ? 'block' : 'none'};
`

function FormLogin({focus, handleControl}) {
  const { setUser } = useContext(AppContext)
  const navigate = useNavigate()
  const [formLogin] = Form.useForm()

  const postLogin = (value) => {
    axios({method: 'POST', url: 'auth/login', data: value})
    .then(({data}) => {
      const object = data.response
      setUser(object)
      navigate('/app')
    })
    .catch(error => message.error(error.response.data.message, 3))
  }

  return (
    <Content focus={focus}>
      <Form layout='vertical' form={formLogin} onFinish={postLogin}>

        <Item mb={6} label='Nombre de usuario' rules={[{required: true, message: 'Campo requerido'}]} name='username'>
          <Input minLength={5} maxLength={10}/>
        </Item>

        <Item mb={20} label='Contraseña' rules={[{required: true, message: 'Campo requerido'}]} name='password'>
          <Input.Password/>
        </Item>

        <Item mb={0}>
          <Button style={{width: '100%'}} type='primary' htmlType='submit'>Iniciar sesion</Button>
          <TextApp fontstyle='italic' align='center'>¿Necesitas una cuenta? <LinkApp display='inline' onClick={()=>{
            formLogin.resetFields()
            handleControl(1)
          }}>Registrarse</LinkApp></TextApp>
        </Item>
      </Form>
    </Content>
  )
}

export default FormLogin