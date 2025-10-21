import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import MapContainer from './components/MainContent/MapContainer/MapContainer'
import WeatherInfo from './components/MainContent/WeatherInfo/WeatherInfo'
import Footer from './components/Footer/Footer'
import './styles/global.css'

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="container">
          <Header />
          <MapContainer />
          <WeatherInfo />
          <Sidebar />
          <Footer />
        </div>
      </div>
    </Provider>
  )
}

export default App
