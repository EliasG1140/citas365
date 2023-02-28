import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Content, TextApp } from '../assets/styles'

const ContentFooter = styled(Layout.Footer)`
  margin-top: 10px;
`

function Footer() {
  return (
    <ContentFooter>
        <TextApp>© 2023 Citas 365. Todos los derechos reservados. - Elias Garcia</TextApp>
    </ContentFooter>
  )
}

export default Footer