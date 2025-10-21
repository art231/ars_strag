import React from 'react'
import { useSelector } from 'react-redux'
import './WeatherInfo.css'

const WeatherInfo = () => {
  const weather = useSelector(state => state.weather)

  return (
    <div className="weather-info">
      <div className="card-title">Погодные условия</div>
      <div className="weather-details">
        <div className="weather-item">
          <div className="weather-label">Ветер</div>
          <div className="weather-value">{weather.windSpeed} км/ч</div>
          <div className="weather-label">Направление: {weather.windDirection}</div>
        </div>
        <div className="weather-item">
          <div className="weather-label">Температура</div>
          <div className="weather-value">{weather.temperature}°C</div>
          <div className="weather-label">Максимальная: {weather.maxTemperature}°C</div>
        </div>
        <div className="weather-item">
          <div className="weather-label">Время</div>
          <div className="weather-value">{weather.lastUpdate}</div>
          <div className="weather-label">Статус: {weather.status}</div>
        </div>
      </div>
    </div>
  )
}

export default WeatherInfo
