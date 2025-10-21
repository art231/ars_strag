import React from 'react'
import { useSelector } from 'react-redux'
import './Header.css'

const Header = () => {
  const { activeUavs, criticalAlerts, highPriority } = useSelector(state => state.uav)

  return (
    <header className="header">
      <div className="header-title">
        <h1>БПЛА Страж</h1>
        <h2>Система мониторинга лесных пожаров</h2>
      </div>
      <div className="status-counters">
        <div className="counter">
          <div className="counter-value normal">{activeUavs}</div>
          <div className="counter-label">Активные БПЛА</div>
        </div>
        <div className="counter">
          <div className="counter-value normal">{criticalAlerts}</div>
          <div className="counter-label">Критические оповещения</div>
        </div>
        <div className="counter">
          <div className="counter-value high">{highPriority}</div>
          <div className="counter-label">Высокий приоритет</div>
        </div>
      </div>
    </header>
  )
}

export default Header
