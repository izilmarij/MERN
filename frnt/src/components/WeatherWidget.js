import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "fc5bd7648f2c42d3edca7b450da75bf9";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const CITY_NAME = "Srinagar"; // Change this to your desired city

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            q: CITY_NAME,
            appid: API_KEY,
            units: "metric", // You can change this to 'imperial'
          },
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, weather } = weatherData;

  return (
    <div>
      <h2>Weather in {CITY_NAME}</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Description: {weather[0].description}</p>
    </div>
  );
};

export default WeatherWidget;
