import React, { useState, useEffect } from 'react'
import './Footer.css'

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('ru-RU'))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('ru-RU'))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <footer className="footer">
      Система мониторинга лесных пожаров "БПЛА Страж" | Обновлено: <span id="current-time">{currentTime}</span>
    </footer>
  )
}

export default Footer
