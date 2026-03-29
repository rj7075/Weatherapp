import { useState } from "react";

export const useLocation = () => {
  const [coords, setCoords] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on your device");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("SUCCESS:", pos);

        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.log("ERROR:", err);

        if (err.code === 1) {
          alert("Permission denied. Please allow location access.");
        } else if (err.code === 2) {
          alert("Location unavailable. Turn ON GPS.");
        } else if (err.code === 3) {
          alert("Location request timed out. Try again.");
        } else {
          alert("Something went wrong.");
        }
      },
      {
        enableHighAccuracy: true, // 🔥 VERY IMPORTANT for mobile
        timeout: 20000,           // ⏱️ gives GPS time to respond
        maximumAge: 0,
      }
    );
  };

  return { coords, getLocation };
};