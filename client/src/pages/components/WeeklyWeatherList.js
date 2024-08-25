import React from 'react';
import WeeklyWeatherCard from './WeeklyWeatherCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const WeeklyWeatherList = ({ weatherData, weatherValues }) => {
  return (
      <ul className="horizontal-list">
        {weatherData.weekly_data?.time && weatherData.weekly_data.time.map((time, i) => (
          <WeeklyWeatherCard
            key={i}
            time={time}
            weatherCode={weatherData.weekly_data.weather_code[i]}
            maxTemp={weatherData.weekly_data.temperature_2m_max[i]}
            minTemp={weatherData.weekly_data.temperature_2m_min[i]}
            avgWindSpeed={weatherData.averageWeeklyWindSpeed[i]}
            weatherValues={weatherValues}
          />
        ))}
      </ul>
  );
};

export default WeeklyWeatherList;
