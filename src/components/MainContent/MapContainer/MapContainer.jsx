import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import './MapContainer.css'

const MapContainer = () => {
  const { uavs } = useSelector(state => state.uav)
  const { alerts } = useSelector(state => state.fireAlerts)
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    // Функция для загрузки Яндекс Карт
    const loadYandexMaps = () => {
      if (window.ymaps) {
        initMap()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_ключ_api&lang=ru_RU'
      script.async = true
      script.onload = () => {
        window.ymaps.ready(initMap)
      }
      document.head.appendChild(script)
    }

    // Функция инициализации карты
    const initMap = () => {
      if (!mapRef.current || mapInstance.current) return

      window.ymaps.ready(() => {
        mapInstance.current = new window.ymaps.Map(mapRef.current, {
          center: [55.751244, 37.618423], // Москва
          zoom: 10,
          controls: ['zoomControl', 'fullscreenControl']
        }, {
          suppressMapOpenBlock: true
        })

        // Добавляем маркеры для БПЛА
        uavs.forEach(uav => {
          if (uav.coordinates) {
            const color = uav.status === 'active' ? '#4caf50' : 
                         uav.status === 'warning' ? '#ff9800' : '#b0b0b0'
            
            const placemark = new window.ymaps.Placemark(
              uav.coordinates,
              {
                hintContent: uav.name,
                balloonContent: `
                  <div>
                    <strong>${uav.name}</strong><br/>
                    Статус: ${uav.status}<br/>
                    Батарея: ${uav.battery}%<br/>
                    Высота: ${uav.altitude}м
                  </div>
                `
              },
              {
                preset: 'islands#circleIcon',
                iconColor: color
              }
            )
            mapInstance.current.geoObjects.add(placemark)
          }
        })

        // Добавляем маркеры для пожарных зон
        alerts.forEach(alert => {
          if (alert.coordinates) {
            const color = alert.priority === 'high' ? '#ff5252' : 
                         alert.priority === 'medium' ? '#ff9800' : '#ffeb3b'
            
            const placemark = new window.ymaps.Placemark(
              alert.coordinates,
              {
                hintContent: `Пожар #${alert.id}`,
                balloonContent: `
                  <div>
                    <strong>Пожар #${alert.id}</strong><br/>
                    Приоритет: ${alert.priority}<br/>
                    Площадь: ${alert.size} га<br/>
                    Температура: ${alert.temperature}°C
                  </div>
                `
              },
              {
                preset: 'islands#circleIcon',
                iconColor: color
              }
            )
            mapInstance.current.geoObjects.add(placemark)
          }
        })
      })
    }

    loadYandexMaps()

    // Очистка при размонтировании
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy()
        mapInstance.current = null
      }
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
          <div className="legend-color" style={{backgroundColor: '#b0b0b0'}}></div>
          <div>Неактивный БПЛА</div>
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
