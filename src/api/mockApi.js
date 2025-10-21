// Заглушки для API, имитирующие получение данных с бэкенда

// Имитация задержки сети
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// API для БПЛА
export const uavApi = {
  async getUavs() {
    await delay(500)
    return {
      data: [
        {
          id: 'uav-001',
          name: 'Альфа (ШАР-001)',
          group: 'ОгненныйЯСгреб',
          status: 'active',
          coordinates: [47.6105, -122.3121],
          battery: 55.3,
          signal: 88,
          altitude: 150,
          speed: 45,
          temperature: 28,
          mission: 'Патрулирование'
        },
        {
          id: 'uav-002',
          name: 'Бета (ШАР-002)',
          group: 'ОгненныйЯСгреб Бета',
          status: 'warning',
          coordinates: [47.6205, -122.3221],
          battery: 41.5,
          signal: 22,
          altitude: 200,
          speed: 38,
          temperature: 31,
          mission: 'Расследование пожара'
        },
        {
          id: 'uav-003',
          name: 'ОгненныйЯсгреб',
          group: 'Базовая станция',
          status: 'active',
          coordinates: [47.6005, -122.3021],
          battery: 71.5,
          signal: 91,
          altitude: 0,
          speed: 0,
          temperature: 25,
          mission: 'Базовая станция'
        }
      ]
    }
  },

  async updateUavStatus(uavId, status) {
    await delay(300)
    return { success: true, message: `Статус БПЛА ${uavId} обновлен` }
  },

  async getUavTelemetry(uavId) {
    await delay(400)
    // Имитация изменения телеметрии
    const batteryChange = (Math.random() - 0.5) * 2
    const signalChange = (Math.random() - 0.5) * 3
    
    return {
      battery: Math.max(10, Math.min(100, 50 + batteryChange)),
      signal: Math.max(5, Math.min(100, 60 + signalChange)),
      timestamp: new Date().toISOString()
    }
  }
}

// API для пожарных оповещений
export const fireAlertsApi = {
  async getAlerts() {
    await delay(600)
    return {
      data: [
        {
          id: 'FIRE-001',
          priority: 'high',
          temperature: 80,
          size: 2.5,
          status: 'confirmed',
          coordinates: [47.6105, -122.3121],
          timestamp: '01:35:10'
        },
        {
          id: 'FIRE-002',
          priority: 'medium',
          temperature: 60,
          size: 1.2,
          status: 'monitoring',
          coordinates: [47.6205, -122.3221],
          timestamp: '01:05:10'
        }
      ]
    }
  },

  async addAlert(alertData) {
    await delay(400)
    const newAlert = {
      id: `FIRE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ...alertData,
      timestamp: new Date().toLocaleTimeString('ru-RU')
    }
    return { success: true, data: newAlert }
  },

  async updateAlert(alertId, updates) {
    await delay(350)
    return { success: true, message: `Оповещение ${alertId} обновлено` }
  }
}

// API для погодных данных
export const weatherApi = {
  async getWeatherData() {
    await delay(700)
    // Имитация изменения погодных данных
    const tempChange = (Math.random() - 0.5) * 2
    const windChange = (Math.random() - 0.5) * 3
    
    return {
      windSpeed: Math.max(0, Math.min(50, 12 + windChange)),
      windDirection: 'С3',
      temperature: Math.max(-10, Math.min(40, 17.6 + tempChange)),
      maxTemperature: 24,
      status: 'Норма',
      lastUpdate: new Date().toLocaleTimeString('ru-RU')
    }
  },

  async subscribeToWeatherUpdates(callback) {
    // Имитация WebSocket подключения для обновлений в реальном времени
    setInterval(async () => {
      const weatherData = await this.getWeatherData()
      callback(weatherData)
    }, 10000) // Обновление каждые 10 секунд
    
    return { success: true, message: 'Подписка на обновления погоды активирована' }
  }
}

// API для карты
export const mapApi = {
  async getMapData() {
    await delay(800)
    return {
      center: [47.6105, -122.3121],
      zoom: 10,
      bounds: [
        [47.5000, -122.4000],
        [47.7000, -122.2000]
      ]
    }
  },

  async getUavPositions() {
    await delay(500)
    return {
      data: [
        { id: 'uav-001', position: [47.6105, -122.3121], status: 'active' },
        { id: 'uav-002', position: [47.6205, -122.3221], status: 'warning' },
        { id: 'uav-003', position: [47.6005, -122.3021], status: 'active' }
      ]
    }
  },

  async getFireZones() {
    await delay(600)
    return {
      data: [
        {
          id: 'FIRE-001',
          center: [47.6105, -122.3121],
          radius: 1000,
          priority: 'high'
        },
        {
          id: 'FIRE-002',
          center: [47.6205, -122.3221],
          radius: 700,
          priority: 'medium'
        }
      ]
    }
  }
}

export default {
  uav: uavApi,
  fireAlerts: fireAlertsApi,
  weather: weatherApi,
  map: mapApi
}
