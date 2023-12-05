import React, { useState, useEffect } from 'react';
import WeatherStat from './WeatherStat'; // Component displaying individual weather stats

function CurrentContainer() {
  const apiResponse1 = {
    "lat": 33.44,
    "lon": -94.04,
    "timezone": "America/Chicago",
    "timezone_offset": -18000,
    "current": {
      "dt": 1684929490,
      "sunrise": 1684926645,
      "sunset": 1684977332,
      "temp":292.55,
      "feels_like":292.87,
      "pressure":1014,
      "humidity":89,
      "dew_point":290.69,
      "uvi":0.16,
      "clouds":53,
      "visibility":10000,
      "wind_speed":3.13,
      "wind_deg":93,
      "wind_gust":6.71,
      "weather":[
         {
            "id":803,
            "main":"Clouds",
            "description":"broken clouds",
            "icon":"04d"
         }
      ]
  }}

  const [weatherData, setWeatherData] = useState(apiResponse1);

   // Function to convert temperature from Kelvin to Fahrenheit
   const convertKelvinToFahrenheit = (kelvin) => {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
  };

  // useEffect(() => {
  //   // Here we fetch the data from the API
  //   const fetchData = async () => {
  //     // Replace this with our actual API call
  //     const apiResponse = {
  //       "lat": 33.44,
  //       "lon": -94.04,
  //       "timezone": "America/Chicago",
  //       "timezone_offset": -18000,
  //       "current": {
  //         "dt": 1684929490,
  //         "sunrise": 1684926645,
  //         "sunset": 1684977332,
  //         "temp":292.55,
  //         "feels_like":292.87,
  //         "pressure":1014,
  //         "humidity":89,
  //         "dew_point":290.69,
  //         "uvi":0.16,
  //         "clouds":53,
  //         "visibility":10000,
  //         "wind_speed":3.13,
  //         "wind_deg":93,
  //         "wind_gust":6.71,
  //         "weather":[
  //            {
  //               "id":803,
  //               "main":"Clouds",
  //               "description":"broken clouds",
  //               "icon":"04d"
  //            }
  //         ]
  //     }

  //   setWeatherData(apiResponse.current);
  //   };
  //   fetchData();
  // }}, []);

  

  // setWeatherData(apiResponse1.current);

//Construct icon code from passed in data 
const iconCode = weatherData.current.weather[0]["icon"];

//Construct icon url
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  
 // Check if weather data is loaded... and if not:
 if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  //Individual WeatherStat components to be rendered
  return (
    <div className="current-container">
      <WeatherStat label="Date/Time" value={new Date(weatherData.current.dt * 1000).toLocaleString()} />
      <WeatherStat label="Sunrise" value={new Date(weatherData.current.sunrise * 1000).toLocaleTimeString()} />
      <WeatherStat label="Sunset" value={new Date(weatherData.current.sunset * 1000).toLocaleTimeString()} />
      <WeatherStat label="Temperature" value={`${convertKelvinToFahrenheit(weatherData.current.temp)} °F`} />
      <WeatherStat label="Feels Like" value={`${convertKelvinToFahrenheit(weatherData.current.feels_like)} °F`} />
      <WeatherStat label="Pressure" value={`${weatherData.current.pressure} hPa`} />
      <WeatherStat label="Humidity" value={`${weatherData.current.humidity}%`} />
      <WeatherStat label="Dew Point" value={`${convertKelvinToFahrenheit(weatherData.current.dew_point)} °F`} />
      <WeatherStat label="UV Index" value={weatherData.current.uvi} />
      <WeatherStat label="Clouds" value={`${weatherData.current.clouds}%`} />
      <WeatherStat label="Visibility" value={`${weatherData.current.visibility} meters`} />
      <WeatherStat label="Wind Speed" value={`${weatherData.current.wind_speed} m/s`} />
      <WeatherStat label="Wind Direction" value={`${weatherData.current.wind_deg}°`} />
      <WeatherStat label="Wind Gust" value={`${weatherData.current.wind_gust} m/s`} />
      {/* {weatherData.weather[0].map((w, index) => (
        <WeatherStat key={index} label="Weather Condition" value={`${w.main}: ${w.description}`} />
      ))} */}
      <img src={iconUrl} alt="Weather Icon"/>
    </div>
  );
}

export default CurrentContainer;
