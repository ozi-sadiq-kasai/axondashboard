// components/Header.js
import React, { useContext } from 'react'
import Logo from '../assets/Logo.png'
import { UserContext } from '../contexts/userContext'

const Header = () => {
  const { user } = useContext(UserContext)

  return (
    <nav>
      <div className="flex">
        <img src={Logo} alt="Logo" className="w-20" />
        <p>
          Hi {user.firstName}/{user.role}
        </p>
      </div>
    </nav>
  )
}

export default Header
