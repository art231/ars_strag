import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uavs: [
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
  ],
  activeUavs: 2,
  criticalAlerts: 0,
  highPriority: 1
}

const uavSlice = createSlice({
  name: 'uav',
  initialState,
  reducers: {
    updateUavStatus: (state, action) => {
      const { id, updates } = action.payload
      const uav = state.uavs.find(u => u.id === id)
      if (uav) {
        Object.assign(uav, updates)
      }
    },
    updateUavBattery: (state, action) => {
      const { id, battery } = action.payload
      const uav = state.uavs.find(u => u.id === id)
      if (uav) {
        uav.battery = battery
      }
    },
    updateUavSignal: (state, action) => {
      const { id, signal } = action.payload
      const uav = state.uavs.find(u => u.id === id)
      if (uav) {
        uav.signal = signal
      }
    },
    updateCounters: (state) => {
      state.activeUavs = state.uavs.filter(u => u.status === 'active').length
      state.criticalAlerts = state.uavs.filter(u => u.battery < 30 || u.signal < 25).length
      state.highPriority = state.uavs.filter(u => u.status === 'warning').length
    }
  }
})

export const { updateUavStatus, updateUavBattery, updateUavSignal, updateCounters } = uavSlice.actions
export default uavSlice.reducer
