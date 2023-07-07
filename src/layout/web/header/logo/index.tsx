import React from 'react'
import config from '../../../../config'
import '../../../../style/logo_page.less'

interface LogoProps {
  name?: string
}

const LogoComponent: React.FC<LogoProps> = ({ name = 'Logo' }) => {
  const { NavLogo, Navtitle } = config.Nav
  return (
    <div className='logo_page'>
      <img className='Image_transform' src={NavLogo} alt='BlogLogo' />
      <h3>{Navtitle}</h3>
    </div>
  )
}

export default LogoComponent
