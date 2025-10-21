import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  windSpeed: 12,
  windDirection: 'С3',
  temperature: 17.6,
  maxTemperature: 24,
  status: 'Норма',
  lastUpdate: new Date().toLocaleTimeString('ru-RU')
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateWeather: (state, action) => {
      Object.assign(state, action.payload)
      state.lastUpdate = new Date().toLocaleTimeString('ru-RU')
    },
    updateWind: (state, action) => {
      const { speed, direction } = action.payload
      state.windSpeed = speed
      state.windDirection = direction
      state.lastUpdate = new Date().toLocaleTimeString('ru-RU')
    },
    updateTemperature: (state, action) => {
      const { current, max } = action.payload
      state.temperature = current
      state.maxTemperature = max
      state.lastUpdate = new Date().toLocaleTimeString('ru-RU')
    }
  }
})

export const { updateWeather, updateWind, updateTemperature } = weatherSlice.actions
export default weatherSlice.reducer
