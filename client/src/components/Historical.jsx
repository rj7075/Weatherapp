import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "../hooks/userLocation";
import { getHistoricalData } from "../services/weatherApi";
import Chart from "../components/Chart";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { CalendarDays, BarChart3 } from "lucide-react";

const Historical = () => {
  const { coords, getLocation } = useLocation();

  useEffect(() => {
  if (coords) {
    toast.success("📍 Location access granted successfully!");
  }
}, [coords]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!coords || !startDate || !endDate) return;

    const today = new Date();

    if (endDate >= today) {
      alert("Select past dates only (not today/future)");
      return;
    }

    if (startDate.getTime() === endDate.getTime()) {
      alert("Select a valid range (not same day)");
      return;
    }

    const diffYears =
      (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);

    if (diffYears > 2) {
      alert("Max 2 years allowed");
      return;
    }

    const fetchData = async () => {
      const res = await getHistoricalData(
        coords.lat,
        coords.lon,
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0]
      );

      

      if (!res || !res.daily) {
        alert("No data returned. Try older dates.");
        return;
      }

      setData(res);
    };

    fetchData();
  }, [coords, startDate, endDate]);

  const handleLocation = () => {
 
  getLocation();
};


  if (!coords)
    return (
  <div className="flex items-center justify-center min-h-screen">
    <button
  onClick={handleLocation}
  className="bg-blue-600 text-white cursor-pointer px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
>
  📍 Use My Location
</button>
  </div>
);

  const daily = data?.daily;

  return (
    <div className="p-4 md:p-6 bg-gray-100 max-w-7xl mx-auto space-y-8">

      {/* 🔗 NAVIGATION */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Link
          to="/"
          className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          Current
        </Link>
        <Link
          to="/historical"
          className="px-4 py-2 rounded-full bg-blue-600 text-white shadow"
        >
          Historical
        </Link>
      </div>

      {/* 📌 HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <BarChart3 /> Historical Weather Analytics
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Analyze past weather trends including temperature, precipitation,
          wind patterns, and sunlight cycles.
        </p>
      </div>

      {/* 📅 DATE PICKER */}
      <div className="bg-gray-80 backdrop-blur-md p-4 rounded-2xl shadow flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2">
          <CalendarDays />
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setStartDate(update[0]);
              setEndDate(update[1]);
            }}
            className="border p-2 rounded-lg"
            placeholderText="Select date range"
          />
        </div>

        <p className="text-sm text-gray-500 text-center md:text-right">
          Select a past date range (max 2 years) to view historical trends.
        </p>
      </div>

      {/* 📌 MESSAGE */}
      {!data && (
        <div className="text-center text-gray-500">
          📊 Please select a valid date range to view data
        </div>
      )}

      {/* 📊 CHARTS */}
      {data && (
        <div className="space-y-10">

          {/* 🌡 TEMPERATURE */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-1">
              🌡 Temperature Trends
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Displays minimum, maximum, and average temperatures over time.
            </p>

            <Chart
              labels={daily.time}
              series={[
                { name: "Min Temp", type: "line", data: daily.temperature_2m_min },
                { name: "Max Temp", type: "line", data: daily.temperature_2m_max },
                { name: "Mean Temp", type: "line", data: daily.temperature_2m_mean },
              ]}
            />
          </div>

          {/* 🌧 PRECIPITATION */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-1">🌧 Precipitation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Shows total rainfall per day in the selected period.
            </p>

            <Chart
              data={daily.precipitation_sum}
              labels={daily.time}
            />
          </div>

          {/* 💨 WIND SPEED */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-1">💨 Wind Speed</h3>
            <p className="text-sm text-gray-600 mb-4">
              Displays maximum wind speed recorded each day.
            </p>

            <Chart
              data={daily.windspeed_10m_max}
              labels={daily.time}
            />
          </div>

          {/* 🧭 WIND DIRECTION */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-1">🧭 Wind Direction</h3>
            <p className="text-sm text-gray-600 mb-4">
              Indicates the dominant wind direction throughout the period.
            </p>

            <Chart
              data={daily.winddirection_10m_dominant}
              labels={daily.time}
            />
          </div>

          {/* 🌅 SUNRISE */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-1">🌅 Sunrise Time</h3>
            <p className="text-sm text-gray-600 mb-4">
              Shows daily sunrise timing variations.
            </p>

            <Chart
              data={daily.sunrise.map(t => new Date(t).getHours())}
              labels={daily.time}
            />
          </div>

          {/* 🌇 SUNSET */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow p-4 md:p-6">
            <h3 className="text-xl font-semibold mb-1">🌇 Sunset Time</h3>
            <p className="text-sm text-gray-600 mb-4">
              Displays sunset timing changes across days.
            </p>

            <Chart
              data={daily.sunset.map(t => new Date(t).getHours())}
              labels={daily.time}
            />
          </div>

        </div>
      )}

    </div>
  );
};

export default Historical;