import { FormOutlined, HomeOutlined, UserOutlined, CalendarOutlined, FileDoneOutlined, MenuOutlined, LogoutOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Avatar, Drawer, Dropdown, Layout, Space } from 'antd';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LinkApp, TextApp } from '../assets/styles';
import { AppContext } from '../context/AppContext';
import srcLogo from './../assets/logo_white.svg'
import ButtonMenu from './ButtonMenu';

const CONSTANTS = {
  heightTitleBar: 55,
  backgroundColorTitleBar: '#3881FF',
}
const ContentHeader = styled(Layout.Header)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  // Reset important styles Header
  height: ${CONSTANTS.heightTitleBar}px !important;
  background-color: ${CONSTANTS.backgroundColorTitleBar} !important;
  line-height: 0px !important;
  -webkit-app-region: drag;
  & > * {
    -webkit-app-region: no-drag;
  }
  & .include-drag {
    -webkit-app-region: drag;
  }
  @media (max-width: 760px) {
    justify-content: flex-end;
  }
`
const ContentBrand = styled(Space)`
  height: ${CONSTANTS.heightTitleBar}px;
  position: absolute;
  left: 50%;
  transform: translate(-70%);
`
const Logo = styled.img`
  width: 50px;
`
const ContentLeft = styled(Space)`
  height: ${CONSTANTS.heightTitleBar}px;
  gap: 0px !important;
  @media (max-width: 760px) {
    display: none;
  }
`
const ContentRight = styled(Space)`
  height: ${CONSTANTS.heightTitleBar}px;
`
const ContentMenuBar = styled(Space)`
  height: ${CONSTANTS.heightTitleBar}px;
  padding-right: 8px;
  border-right: 1px solid #d2d5da13;
  @media (max-width: 760px) {
    display: none;
  }
`
const MenuMobile = styled.button`
  display: none;
  height: 55px;
  margin-right: 10px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  @media (max-width: 760px) {
    display: block;
  }
`
const ContentMenuMobile = styled(Drawer)`
  & * {
    text-align: right;
  }
  & .ant-drawer-body{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`
const UserMenuMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const ListMenuMobile = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
`

function Header() {
  const { user, setUser } = useContext(AppContext)
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false)

  const logOut = () => {
    setUser({})
    navigate('/')
  }

  const items = [
    {
      key: '1',
      label: 'Cerrar sesión',
      danger: true,
      icon: <LogoutOutlined />,
      onClick: logOut
    }
  ]

  return (
    <ContentHeader className='content_app'>
      <ContentLeft>
        <ButtonMenu icon={<HomeOutlined />} bold='Inicio' onClick={()=> navigate('')}/>
        {user.rol === 'ADMIN' && (
          <>
            <ButtonMenu icon={<CalendarOutlined />} text='Solicitar' bold='citas' onClick={()=> navigate('solicitar-citas')}/>
            <ButtonMenu icon={<FileDoneOutlined />} text='Mis' bold='citas' onClick={()=> navigate('mis-citas')}/>
          </>
        )}
        {user.rol === 'ADMIN' && (
          <>
            <ButtonMenu icon={<ScheduleOutlined />} text='Gestionar' bold='Horarios' onClick={()=> navigate('mi-horario')}/>
            <ButtonMenu icon={<FormOutlined />} text='Gestionar' bold='Citas' onClick={()=> navigate('gestion-citas')}/>
          </>
        )}
      </ContentLeft>

      <ContentBrand>
        <Logo src={srcLogo} alt="Logo Cita365" />
      </ContentBrand>
      
      <ContentRight>
        <ContentMenuBar>
          <Dropdown menu={{items}} trigger={['click']} placement='bottomRight'>
            <TextApp color='#fff' fontweight='bold'>{user.nombre && `${user.nombre} ${user.apellido}`} <Avatar style={{backgroundColor: '#001c37'}} size="small" icon={<UserOutlined />} /></TextApp>
          </Dropdown>
        </ContentMenuBar>
        <MenuMobile onClick={()=> setOpenMenu(true)}><MenuOutlined /></MenuMobile>
      </ContentRight>

      <ContentMenuMobile size='default' title={user.nombre && `${user.nombre} ${user.apellido}`} onClose={()=> setOpenMenu(false)} open={openMenu}>

        <ListMenuMobile>
          <LinkApp size={20} onClick={()=> {navigate('');setOpenMenu(false)}}>Inicio</LinkApp>
          {user.rol === 'USER' && (
            <>
              <LinkApp size={20} onClick={()=> {navigate('solicitar-citas'); setOpenMenu(false)}}>Solicitar citas</LinkApp>
              <LinkApp size={20} onClick={()=> {navigate('mis-citas');setOpenMenu(false)}}>Mis citas</LinkApp>
            </>
          )}
          {user.rol === 'ADMIN' && (
            <>
              <LinkApp size={20} onClick={()=> {navigate('mi-horario');setOpenMenu(false)}}>Mi horario</LinkApp>
              <LinkApp size={20} onClick={()=> {navigate('gestion-citas');setOpenMenu(false)}}>Gestionar citas</LinkApp>
            </>
          )}
        </ListMenuMobile>

        <UserMenuMobile>
          <TextApp color='#FF4D4F' fontweight='bold' size={18} onClick={logOut}>Cerrar sesion</TextApp>
        </UserMenuMobile>
        
      </ContentMenuMobile>
    </ContentHeader>
  )
}

export default Header