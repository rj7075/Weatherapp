import { useState } from "react";

export const useLocation = () => {
  const [coords, setCoords] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.log(err);
        alert("Location access denied");
      }
    );
  };

  return { coords, getLocation };
};