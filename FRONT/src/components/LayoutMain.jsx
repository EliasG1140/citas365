import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const { Content } = Layout;

const MainContent = styled(Layout)`
  height: 100vh;
  width: 100vw;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #EDF2F9;
`

const ContentCenter = styled(Content)`
  background-color: #f3f3f3;
  overflow: auto;
  display: flex;
  flex-direction: column;
`

function LayoutMain() {
  return (
    <MainContent >
      <Header/>
      <ContentCenter>
        <Outlet/>
        <Footer/>
      </ContentCenter>
    </MainContent>
  )
}

export default LayoutMain