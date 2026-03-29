import React from 'react'
import CurrentWeather from '../components/CurrentWeather'

const weatherPage = () => {
  return (
    <div className="min-h-screen bg-gray-300 p-6">
    <div className="max-w-7xl mx-auto space-y-6">
    <CurrentWeather/>

  </div>
</div>
  )
}

export default weatherPage
