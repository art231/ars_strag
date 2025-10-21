import { configureStore } from '@reduxjs/toolkit'
import uavReducer from './slices/uavSlice'
import fireAlertsReducer from './slices/fireAlertsSlice'
import weatherReducer from './slices/weatherSlice'

export const store = configureStore({
  reducer: {
    uav: uavReducer,
    fireAlerts: fireAlertsReducer,
    weather: weatherReducer,
  },
})

export default store
