import React, { useState } from 'react';

const WeatherInputBar = ({ onWeatherDataChange }) => {
    const [zipcode, setZipcode] = useState('');
  
    const handleInputChange = (e) => {
      setZipcode(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8080/forecast?zipcode=${zipcode}`)
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              console.log('Weather data successfully retrieved!');
              onWeatherDataChange(data);
          })
          .catch((error) => {
              console.error('An error occurred while fetching weather data:', error.message);
          });
  };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Zip Code:
            <input
              type="text"
              value={zipcode}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Get Weather</button>
        </form>
      </div>
    );
  };
  
  export default WeatherInputBar;