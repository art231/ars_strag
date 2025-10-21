import React from 'react'
import { useSelector } from 'react-redux'
import './UavStatus.css'

const UavStatus = () => {
  const { uavs } = useSelector(state => state.uav)

  // Группируем БПЛА по группам
  const groupedUavs = uavs.reduce((groups, uav) => {
    if (!groups[uav.group]) {
      groups[uav.group] = []
    }
    groups[uav.group].push(uav)
    return groups
  }, {})

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return 'active'
      case 'warning': return 'warning'
      default: return 'normal'
    }
  }

  const getBatteryClass = (battery) => {
    if (battery < 30) return 'critical'
    if (battery < 50) return 'high'
    return 'normal'
  }

  const getSignalClass = (signal) => {
    if (signal < 25) return 'critical'
    if (signal < 50) return 'high'
    return 'normal'
  }

  return (
    <div className="card">
      <div className="card-title">Статус флота БПЛА</div>
      
      {Object.entries(groupedUavs).map(([groupName, groupUavs]) => (
        <div key={groupName} className="uav-group">
          <div className="uav-group-title">{groupName}</div>
          
          {groupUavs.map(uav => (
            <div key={uav.id} className="uav-item">
              <div className="uav-name">
                {uav.name}
                <span className={`uav-status ${getStatusClass(uav.status)}`}>
                  {uav.status === 'active' ? 'Активен' : 
                   uav.status === 'warning' ? 'Слабый сигнал' : 'Неактивен'}
                </span>
              </div>
              <div>{uav.coordinates.join(', ')}</div>
              <div className="uav-details">
                <div>Батарея: <span className={getBatteryClass(uav.battery)}>{uav.battery}%</span></div>
                <div>Сигнал: <span className={getSignalClass(uav.signal)}>{uav.signal}%</span></div>
                <div>Высота: {uav.altitude}м</div>
                <div>Скорость: {uav.speed} км/ч</div>
                <div>Температура: {uav.temperature}°C</div>
                <div>Миссия: {uav.mission}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default UavStatus
