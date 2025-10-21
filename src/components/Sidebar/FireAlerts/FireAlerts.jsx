import React from 'react'
import { useSelector } from 'react-redux'
import './FireAlerts.css'

const FireAlerts = () => {
  const { alerts } = useSelector(state => state.fireAlerts)

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'fire-priority-high'
      case 'medium': return 'fire-priority-medium'
      case 'low': return 'fire-priority-low'
      default: return 'fire-priority-medium'
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Высокий'
      case 'medium': return 'Средний'
      case 'low': return 'Низкий'
      default: return 'Средний'
    }
  }

  return (
    <div className="card">
      <div className="card-title">Пожарные оповещения</div>
      
      {alerts.length === 0 ? (
        <div className="no-alerts">Нет активных оповещений</div>
      ) : (
        alerts.map(alert => (
          <div key={alert.id} className="fire-alert">
            <div className="fire-id">
              {alert.id}
              <span className={`fire-priority ${getPriorityClass(alert.priority)}`}>
                {getPriorityText(alert.priority)}
              </span>
            </div>
            <div className="fire-details">
              <div>Температура: {alert.temperature}°C</div>
              <div>Размер: {alert.size} га</div>
              <div>Статус: {alert.status === 'confirmed' ? 'Подтвержден' : 'Мониторинг'}</div>
              <div>Время: {alert.timestamp}</div>
              <div>Координаты: {alert.coordinates.join(', ')}</div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default FireAlerts
