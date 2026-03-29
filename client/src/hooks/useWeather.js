// hooks/useWeather.js
import { getWeatherData, getAirQuality } from "../services/weatherApi";
import { useEffect, useState} from "react";

export const useWeather = (coords) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!coords) return;

    const fetchData = async () => {
      const [weatherRes, airRes] = await Promise.all([
        getWeatherData(coords.lat, coords.lon),
        getAirQuality(coords.lat, coords.lon),
      ]);

      setData({
        weather: weatherRes,
        air: airRes,
      });
    };

    fetchData();
  }, [coords]);

  return data;
};