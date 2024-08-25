import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './WeatherPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getWeather } from '../api/weatherApi';
import BackButton from './components/BackButton.js';
import WeeklyWeatherList from './components/WeeklyWeatherList.js';
import CurrentWeather from './components/CurrentWeather';

// weatherDescriptions ve weatherIcons burada kalacak...
const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog and depositing rime fog",
  48: "Fog and depositing rime fog",
  51: "Drizzle: Light intensity",
  53: "Drizzle: Moderate intensity",
  55: "Drizzle: Dense intensity",
  56: "Freezing Drizzle: Light intensity",
  57: "Freezing Drizzle: Dense intensity",
  61: "Rain: Slight intensity",
  63: "Rain: Moderate intensity",
  65: "Rain: Heavy intensity",
  66: "Freezing Rain: Light intensity",
  67: "Freezing Rain: Heavy intensity",
  71: "Snow fall: Slight intensity",
  73: "Snow fall: Moderate intensity",
  75: "Snow fall: Heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight intensity",
  81: "Rain showers: Moderate intensity",
  82: "Rain showers: Violent intensity",
  85: "Snow showers: Slight intensity",
  86: "Snow showers: Heavy intensity",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const weatherIcons = {
  0: "sunny.png",
  1: "sunny.png",
  2: "partly-cloudy.gif",
  3: "overcast.png",
  45: "foggy.png",
  48: "foggy.png",
  51: "drizzle.png",
  53: "drizzle.png",
  55: "drizzle.png",
  56: "drizzle.png",
  57: "drizzle.png",
  61: "rainy.png",
  63: "rainy.png",
  65: "rainy.png",
  66: "rainy.png",
  67: "rainy.png",
  71: "snowfall.png",
  73: "snowfall.png",
  75: "snowfall.png",
  77: "snow.png",
  80: "rainy.png",
  81: "rainy.png",
  82: "rainy.png",
  85: "snowfall.png",
  86: "snowfall.png",
  95: "thunderstorm.gif",
  96: "thunderstorm.gif",
  99: "thunderstorm.gif",
};

const useWeatherData = (latitude, longitude) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (latitude && longitude) {
        try {
          const data = await getWeather(latitude, longitude);
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  return weatherData;
};

const useLocalTime = (initialTime) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (initialTime) {
      const currentDate = new Date();
      let [hours, minutes] = initialTime.split(':').map(Number);
      currentDate.setHours(hours, minutes, 0, 0);

      const updateLocalTime = () => {
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        setTime(`${hours}:${minutes}`);
      };

      updateLocalTime();

      const interval = setInterval(() => {
        currentDate.setMinutes(currentDate.getMinutes() + 1);
        updateLocalTime();
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [initialTime]);

  return time;
};

const WeatherPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const latitude = queryParams.get('latitude');
  const longitude = queryParams.get('longitude');
  const cityName = queryParams.get('cityName');

  const weatherData = useWeatherData(latitude, longitude);
  const time = useLocalTime(weatherData?.time);

  const weatherValues = useMemo(() => ({
    descriptions: weatherDescriptions,
    icons: weatherIcons
  }), []);

  const scrollHorizontally = useCallback((event) => {
    event.preventDefault();
    const container = event.currentTarget;
    const delta = Math.max(-1, Math.min(1, event.deltaY));
    container.scrollLeft += delta * 50;
  }, []);

  if (!weatherData) {
    return <div className="wp gradient-background">Loading weather data...</div>;
  }

  return (
    <div className={`wp ${weatherData.isDay ? 'wp-background-sunset' : 'wp-background-night'}`}>
      <div className="container h-100">
        <BackButton route={'/'} />
        <div className="row d-flex h-100 justify-content-center">
          <div className="col-md-10 my-5">
            <div className="card" style={{ borderRadius: '35px' }}>
              <div className="card-body p-4">
                <CurrentWeather
                  cityName={cityName}
                  time={time}
                  weatherData={weatherData}
                  weatherValues={weatherValues}
                />
                <section id="weekly">
                  <div className="horizontal-scroll-container" onWheel={scrollHorizontally}>
                    <WeeklyWeatherList weatherData={weatherData} weatherValues={weatherValues} />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WeatherPage);