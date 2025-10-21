import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import './MapContainer.css'

// Временная заглушка для карты, пока не настроим Leaflet
const MapContainer = () => {
  const { uavs } = useSelector(state => state.uav)
  const { alerts } = useSelector(state => state.fireAlerts)
  const mapRef = useRef(null)

  useEffect(() => {
    // Здесь будет инициализация Leaflet карты
    // Пока используем заглушку
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div style="
          width: 100%; 
          height: 100%; 
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          text-align: center;
        ">
          <div>
            <div style="font-size: 24px; margin-bottom: 10px;">🗺️ Карта мониторинга</div>
            <div>Активных БПЛА: ${uavs.filter(u => u.status === 'active').length}</div>
            <div>Пожарных зон: ${alerts.length}</div>
            <div style="margin-top: 20px; font-size: 14px; opacity: 0.8;">
              Leaflet карта будет подключена после настройки
            </div>
          </div>
        </div>
      `
    }
  }, [uavs, alerts])

  return (
    <div className="map-container">
      <div ref={mapRef} className="map" id="map"></div>
      
      <div className="map-legend">
        <div className="legend-title">Легенда карты</div>
        <div className="legend-item">
          <div className="legend-color" style={{backgroundColor: '#4caf50'}}></div>
          <div>Активный БПЛА</div>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{backgroundColor: '#ff9800'}}></div>
          <div>БПЛА с проблемами</div>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{backgroundColor: '#ff5252'}}></div>
          <div>Критический пожар</div>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{backgroundColor: '#ff9800'}}></div>
          <div>Пожар высокого риска</div>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{backgroundColor: '#ffeb3b'}}></div>
          <div>Средний риск</div>
        </div>
      </div>
    </div>
  )
}

export default MapContainer
