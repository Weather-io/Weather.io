import React, { useState, useEffect } from 'react';
import WeatherInputBar from './WeatherInputBar' //Input Bar Component
import WeatherStat from './WeatherStat'; // Component displaying individual weather stats
import '../assets/styles/styles.scss';

function CurrentContainer() {
  const apiResponse1 = {
  
      "coord": {
  
          "lon": -97.6849,
  
          "lat": 30.3085
  
      },
  
      "weather": [
  
          {
  
              "id": 800,
  
              "main": "Clear",
  
              "description": "clear sky",
  
              "icon": "01n"
  
          }
  
      ],
  
      "base": "stations",
  
      "main": {
  
          "temp": 288.64,
  
          "feels_like": 287.81,
  
          "temp_min": 284.91,
  
          "temp_max": 291.81,
  
          "pressure": 1030,
  
          "humidity": 60
  
      },
  
      "visibility": 10000,
  
      "wind": {
  
          "speed": 0.89,
  
          "deg": 65,
  
          "gust": 1.34
  
      },
  
      "clouds": {
  
          "all": 0
  
      },
  
      "dt": 1701824900,
  
      "sys": {
  
          "type": 2,
  
          "id": 2023691,
  
          "country": "US",
  
          "sunrise": 1701781971,
  
          "sunset": 1701819006
  
      },
  
      "timezone": -21600,
  
      "id": 0,
  
      "name": "Austin",
  
      "cod": 200
  
  }
  
  

  const [weatherData, setWeatherData] = useState(apiResponse1);

  const handleWeatherDataChange = (data) => {
    setWeatherData(data);
  };


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
const iconCode = weatherData.weather[0]["icon"];

//Construct icon url
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

//Construct description

const descriptionbase = weatherData.weather[0]["description"];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const descriptionCode = capitalizeFirstLetter(descriptionbase);
  
 // Check if weather data is loaded... and if not:
 if (weatherData == {}) {
    return <div>Loading weather data...</div>;
  }

  // Format date and time
  const dateTimeStr = new Date(weatherData.dt * 1000).toLocaleString();

  //Individual WeatherStat components to be rendered
  return (
    <div className="current-container">
        <div className="weather-header"> 
            <div className="weather-location">{weatherData.name}</div>
            <div className="weather-date-time">{dateTimeStr}</div>
        </div>
        <WeatherInputBar onWeatherDataChange={handleWeatherDataChange} />
        <div className="weather-main">
          <div className="image-container">
            <img src={iconUrl} alt="Weather Icon"/>
            <p className="caption">{descriptionCode}</p>
          </div>
            <WeatherStat label="Feels Like" value={`${convertKelvinToFahrenheit(weatherData.main.feels_like)} °F`} />
            <WeatherStat label="Temperature" value={`${convertKelvinToFahrenheit(weatherData.main.temp)} °F`} />
            <WeatherStat label="Clouds" value={`${weatherData.clouds.all}%`} />
        </div>
        <div className="weather-details">
      <WeatherStat label="Sunrise" value={new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()} />
      <WeatherStat label="Sunset" value={new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()} />
      <WeatherStat label="Humidity" value={`${weatherData.main.humidity}%`} />
      <WeatherStat label="Visibility" value={`${weatherData.visibility} meters`} />
        <div className="weather-wind">
        <WeatherStat label="Wind Direction" value={`${weatherData.wind.deg}°`} />
            <WeatherStat label="Wind Speed" value={`${weatherData.wind.speed} m/s`} />
            <WeatherStat label="Wind Gust" value={`${weatherData.wind.gust} m/s`} />
            <WeatherStat label="Pressure" value={`${weatherData.main.pressure} hPa`} />
        </div>
            {/* {weatherData.weather[0].map((w, index) => (
            <WeatherStat key={index} label="Weather Condition" value={`${w.main}: ${w.description}`} />
            ))} */}
        </div>
    </div>
  );
}

export default CurrentContainer;
