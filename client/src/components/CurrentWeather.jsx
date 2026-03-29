import { useWeather } from "../hooks/useWeather.js";
import WeatherCard from "./WeatherCard";
import Chart from "./Chart";
import { useLocation } from "../hooks/userLocation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  Activity,
  CalendarDays,
} from "lucide-react";

const CurrentWeather = () => {
  const [unit, setUnit] = useState("C");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { coords, getLocation } = useLocation();
  const data = useWeather(coords);

  if (!coords) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="text-gray-600 text-lg text-center">
        📍 Please allow location to view weather data
      </p>

      <button
        onClick={getLocation}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
      >
        Use My Location
      </button>
    </div>
  );
}

if (!data) {
  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold">
      🌤 Loading weather data...
    </div>
  );
}

if (!data) {
  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold">
      🌤 Loading weather data...
    </div>
  );
}

  const { weather, air } = data;

  const hourly = weather.hourly;
  const daily = weather.daily;
  const current = weather.current_weather;
  const hourlyAir = air.hourly;

  const convertTemp = (t) =>
    unit === "F" ? (t * 9) / 5 + 32 : t;

  const selectedDateStr = selectedDate.toISOString().split("T")[0];

  const filteredIndexes = hourly.time
    .map((t, i) => (t.startsWith(selectedDateStr) ? i : null))
    .filter((i) => i !== null);

  const getFilteredData = (arr) =>
    filteredIndexes.map((i) => arr[i]);

  const filteredTime = getFilteredData(hourly.time);

  return (
    <div className="p-4 md:p-6 space-y-8 bg-gray-100 max-w-7xl mx-auto">

      {/* 🔗 Navigation */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <div className="flex justify-center md:justify-end">
        <button
          onClick={getLocation}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          📍 Use My Location
        </button>
      </div>
        <Link
          to="/"
          className="px-4 py-2 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        >
          Current
        </Link>
        <Link
          to="/historical"
          className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          Historical
        </Link>
      </div>

      {/* 📅 Controls */}
      <div className="flex flex-col bg-gray-300 md:flex-row gap-4 justify-between items-center  backdrop-blur-md p-4 rounded-2xl shadow">

        <div className="flex  items-center gap-2">
          <CalendarDays />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border p-2 rounded-lg"
          />
        </div>

        <button
          onClick={() => setUnit(unit === "C" ? "F" : "C")}
          className="flex items-center gap-2 bg-gradient-to-r cursor-pointer from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition"
        >
          <Thermometer size={18} />
          Switch to °{unit === "C" ? "F" : "C"}
        </button>
      </div>

      {/* 🌤️ WEATHER SUMMARY */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          🌍 Current Weather Overview
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

          <WeatherCard title="Current Temp" value={`${convertTemp(current.temperature)}°${unit}`} icon={<Thermometer />} />
          <WeatherCard title="Max Temp" value={`${convertTemp(daily.temperature_2m_max[0])}°${unit}`} icon={<Thermometer />} />
          <WeatherCard title="Min Temp" value={`${convertTemp(daily.temperature_2m_min[0])}°${unit}`} icon={<Thermometer />} />

          <WeatherCard title="Humidity" value={`${hourly.relativehumidity_2m[0]}%`} icon={<Droplets />} />
          <WeatherCard title="Precipitation" value={hourly.precipitation[0]} icon={<CloudRain />} />
          <WeatherCard title="UV Index" value={daily.uv_index_max[0]} icon={<Sun />} />

          <WeatherCard title="Sunrise" value={daily.sunrise[0]} icon={<Sun />} />
          <WeatherCard title="Sunset" value={daily.sunset[0]} icon={<Sun />} />

          <WeatherCard title="Wind Speed" value={daily.windspeed_10m_max[0]} icon={<Wind />} />
          <WeatherCard title="Rain Probability" value={daily.precipitation_probability_max[0]} icon={<CloudRain />} />

          <WeatherCard title="PM10" value={hourlyAir.pm10[0]} icon={<Activity />} />
          <WeatherCard title="PM2.5" value={hourlyAir.pm2_5[0]} icon={<Activity />} />
        </div>
      </div>

      {/* 📊 CHART SECTION */}
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          📊 Hourly Weather Analytics
        </h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          These charts show hourly variations for the selected date. Analyze trends like temperature changes,
          humidity levels, wind speed, and air quality throughout the day.
        </p>

        <div className="space-y-10">

  {/* 🌡 TEMPERATURE */}
  <div className="bg-gray-100 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
    <h3 className="text-xl font-semibold mb-1">🌡 Temperature Trend</h3>
    <p className="text-sm text-gray-600 mb-4">
      Shows how temperature changes throughout the selected day. Helps identify peak heat hours and cooler periods.
    </p>

    <Chart
      data={getFilteredData(hourly.temperature_2m).map(convertTemp)}
      labels={filteredTime}
    />
  </div>

  {/* 💧 HUMIDITY */}
  <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
    <h3 className="text-xl font-semibold mb-1">💧 Humidity Levels</h3>
    <p className="text-sm text-gray-600 mb-4">
      Displays moisture levels in the air. High humidity can feel warmer, while low humidity indicates dry conditions.
    </p>

    <Chart
      data={getFilteredData(hourly.relativehumidity_2m)}
      labels={filteredTime}
    />
  </div>

  {/* 🌧 PRECIPITATION */}
  <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
    <h3 className="text-xl font-semibold mb-1">🌧 Precipitation</h3>
    <p className="text-sm text-gray-600 mb-4">
      Indicates rainfall intensity throughout the day. Useful for planning outdoor activities.
    </p>

    <Chart
      data={getFilteredData(hourly.precipitation)}
      labels={filteredTime}
    />
  </div>

  {/* 👁 VISIBILITY */}
  <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
    <h3 className="text-xl font-semibold mb-1">👁 Visibility</h3>
    <p className="text-sm text-gray-600 mb-4">
      Represents how clearly objects can be seen. Lower values may indicate fog, pollution, or haze.
    </p>

    <Chart
      data={getFilteredData(hourly.visibility)}
      labels={filteredTime}
    />
  </div>

  {/* 💨 WIND SPEED */}
  <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
    <h3 className="text-xl font-semibold mb-1">💨 Wind Speed</h3>
    <p className="text-sm text-gray-600 mb-4">
      Tracks wind intensity during the day. Higher speeds may indicate storms or strong weather systems.
    </p>

    <Chart
      data={getFilteredData(hourly.windspeed_10m)}
      labels={filteredTime}
    />
  </div>

  {/* 🌫 AIR QUALITY */}
  <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
    <h3 className="text-xl font-semibold mb-1">🌫 Air Quality (PM10 vs PM2.5)</h3>
    <p className="text-sm text-gray-600 mb-4">
      Compares particulate matter levels in the air. PM2.5 is more harmful as it can enter lungs and bloodstream.
    </p>

    <Chart
      labels={filteredTime}
      series={[
        {
          name: "PM10",
          type: "line",
          data: getFilteredData(hourlyAir.pm10),
        },
        {
          name: "PM2.5",
          type: "line",
          data: getFilteredData(hourlyAir.pm2_5),
        },
      ]}
    />
  </div>

</div>
      </div>

    </div>
  );
};

export default CurrentWeather;