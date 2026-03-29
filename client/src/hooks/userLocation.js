    // hooks/useWeather.js
import { useEffect, useState } from "react";

export const useLocation = () => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  return coords;
};