import React, { useState } from 'react';

const WeatherInputBar = ({ onWeatherDataChange }) => {
    const [zipCode, setZipCode] = useState('');
  
    const handleInputChange = (e) => {
      setZipCode(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      fetch(`/forecast?zipcode=${zipCode}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log('Weather data successfully retrieved!');
        })
        .catch((error) => {
          console.error('An error occurred while fetching weather data:', error.message);
          // Handle error as needed
        });
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Zip Code:
            <input
              type="text"
              value={zipCode}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Get Weather</button>
        </form>
      </div>
    );
  };
  
  export default WeatherInputBar;