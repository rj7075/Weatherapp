// services/weatherApi.js

import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1";
const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";
const ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";

// 🔥 Simple in-memory cache (improves performance)
const cache = {};

/* =========================
   🌦 CURRENT + FORECAST DATA
========================= */
export const getWeatherData = async (lat, lon) => {
  try {
    const key = `weather-${lat}-${lon}`;

    // ✅ Return cached data if available
    if (cache[key]) {
      return cache[key];
    }

    const res = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        latitude: lat,
        longitude: lon,

        // 🌡️ Hourly data
        hourly: [
          "temperature_2m",
          "relativehumidity_2m",
          "precipitation",
          "visibility",
          "windspeed_10m",
          "precipitation_probability",
          "uv_index",
          "winddirection_10m"
        ].join(","),

        // 📊 Daily data
        daily: [
          "temperature_2m_max",
          "temperature_2m_min",
          "sunrise",
          "sunset",
          "uv_index_max",
          "precipitation_probability_max",
          "windspeed_10m_max"
        ].join(","),

        current_weather: true,
        timezone: "auto",
      },
    });

    // ✅ Save in cache
    cache[key] = res.data;

    return res.data;
  } catch (error) {
    console.error("❌ Weather API Error:", error);
    return null;
  }
};

/* =========================
   🌫 AIR QUALITY DATA
========================= */
export const getAirQuality = async (lat, lon) => {
  try {
    const key = `air-${lat}-${lon}`;

    if (cache[key]) {
      return cache[key];
    }

    const res = await axios.get(AIR_QUALITY_URL, {
      params: {
        latitude: lat,
        longitude: lon,

        hourly: [
          "pm10",
          "pm2_5",
          "carbon_monoxide",
          "nitrogen_dioxide",
          "sulphur_dioxide",
          "ozone"
        ].join(","),

        timezone: "auto",
      },
    });

    cache[key] = res.data;

    return res.data;
  } catch (error) {
    console.error("❌ Air Quality API Error:", error);
    return null;
  }
};

/* =========================
   📈 HISTORICAL DATA (Page 2)
========================= */
export const getHistoricalData = async (lat, lon, startDate, endDate) => {
  try {
    const key = `history-${lat}-${lon}-${startDate}-${endDate}`;

    if (cache[key]) {
      return cache[key];
    }

    const res = await axios.get(ARCHIVE_URL, {
      params: {
        latitude: lat,
        longitude: lon,

        start_date: startDate,
        end_date: endDate,

        // 📊 Daily historical data
        daily: [
          "temperature_2m_max",
          "temperature_2m_min",
          "temperature_2m_mean",
          "sunrise",
          "sunset",
          "precipitation_sum",
          "windspeed_10m_max",
          "winddirection_10m_dominant"
        ].join(","),

        timezone: "auto",
      },
    });

    cache[key] = res.data;
    console.log("API rEsponse",res.data);

    return res.data;
  } catch (error) {
    console.error("❌ Historical API Error:", error);
    return null;
  }
};