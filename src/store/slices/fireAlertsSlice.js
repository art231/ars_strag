import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  alerts: [
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

const fireAlertsSlice = createSlice({
  name: 'fireAlerts',
  initialState,
  reducers: {
    addFireAlert: (state, action) => {
      state.alerts.push(action.payload)
    },
    updateFireAlert: (state, action) => {
      const { id, updates } = action.payload
      const alert = state.alerts.find(a => a.id === id)
      if (alert) {
        Object.assign(alert, updates)
      }
    },
    removeFireAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload)
    },
    updateFireTemperature: (state, action) => {
      const { id, temperature } = action.payload
      const alert = state.alerts.find(a => a.id === id)
      if (alert) {
        alert.temperature = temperature
      }
    },
    updateFireSize: (state, action) => {
      const { id, size } = action.payload
      const alert = state.alerts.find(a => a.id === id)
      if (alert) {
        alert.size = size
      }
    }
  }
})

export const { 
  addFireAlert, 
  updateFireAlert, 
  removeFireAlert, 
  updateFireTemperature, 
  updateFireSize 
} = fireAlertsSlice.actions

export default fireAlertsSlice.reducer
