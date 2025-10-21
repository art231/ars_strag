import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UavStatus from './UavStatus/UavStatus'
import FireAlerts from './FireAlerts/FireAlerts'
import './Sidebar.css'

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <button 
        className="mobile-menu-btn" 
        onClick={toggleMobileMenu}
        aria-label="Открыть меню"
      >
        ☰
      </button>
      
      <div className={`sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <UavStatus />
        <FireAlerts />
      </div>
    </>
  )
}

export default Sidebar
