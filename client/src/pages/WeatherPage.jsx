import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './WeatherPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import getWeatherData from '../services/weatherApi.js';
import BackButton from './components/BackButton.js';
import WeeklyWeatherList from './components/WeeklyWeatherList.js';
import CurrentWeather from './components/CurrentWeather';
import Loading from './components/Loading.js';
import { WEATHER_DESCRIPTIONS, WEATHER_ICONS } from '../constants/weatherConstants.js';

const useWeatherData = (latitude, longitude) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (latitude && longitude) {
        try {
          const data = await getWeatherData(latitude, longitude);
          console.log(data)
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
        setTime(currentDate.toTimeString().slice(0, 5));
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
    descriptions: WEATHER_DESCRIPTIONS,
    icons: WEATHER_ICONS
  }), []);

  const scrollHorizontally = useCallback((event) => {
    const container = event.currentTarget;
    container.scrollLeft += Math.sign(event.deltaY) * 50;
  }, []);

  if (!weatherData) {
    return <div className="wp gradient-background d-flex justify-content-center align-content-center"><Loading/></div>;
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