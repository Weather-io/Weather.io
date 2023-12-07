import React from 'react';

function WeatherStat({ label, value }) {
  return (
    <div className="weather-stat">
      <strong>{label}:</strong> {value}
    </div>
  );
}

export default WeatherStat;
