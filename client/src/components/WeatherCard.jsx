import React from "react";

const WeatherCard = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-300 backdrop-blur-md shadow-md rounded-2xl p-4 sm:p-5 
                    hover:shadow-xl hover:-translate-y-1 transition duration-300">

      {/* Header */}
      <div className="flex items-center  justify-center sm:justify-start gap-2 text-gray-600">
        <span className="text-blue-500">{icon}</span>
        <h2 className="text-xs sm:text-sm font-medium">{title}</h2>
      </div>

      {/* Value */}
      <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-3 text-center sm:text-left">
        {value}
      </p>
    </div>
  );
};

export default WeatherCard;