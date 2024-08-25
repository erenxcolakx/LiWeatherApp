import React from 'react';
import Loading from './Loading'; // Loading componentini buraya import etmeyi unutmayın.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const CurrentWeather = ({ cityName, time, weatherData, weatherValues }) => {
  return (
      <>
        <div className="d-flex">
          {cityName ? (<h6 className="flex-grow-1" id="cityName">{cityName}</h6>) : ""}
          {time ? (<h6 id="time">{time}</h6>) : ""}
        </div>
        <div className="d-flex flex-column text-center mt-5 mb-4">
          {weatherData.temperature ? (
            <h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }} id="temperature">
              {weatherData.temperature}°C
            </h6>
          ) : ""}
          <span className="small" style={{ color: '#868B94' }}>
            {weatherValues?.descriptions?.[weatherData.weatherCode] || <Loading />}
          </span>
        </div>
        <div className="d-flex align-items-center">
          <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
            <div className="d-flex">
              <img src="./images/wind.png" className="my-auto" width="24px" height="24px" alt="wind-speed-icon" data-toggle="tooltip" data-placement="top" title="Wind Speed" />
              {weatherData.windSpeed ? (<span className="ms-1" id="windSpeed">{weatherData.windSpeed} km/h</span>) : ""}
            </div>
            <div className="d-flex">
              <img src="./images/humidity.png" className="my-auto" width="20px" height="20px" alt="humidity-icon" data-toggle="tooltip" data-placement="top" title="Humidity" />
              {weatherData.humidity ? (<span className="ms-2" id="humidity">{weatherData.humidity}%</span>) : ""}
            </div>
          </div>
          <div>
            {weatherValues?.icons?.[weatherData.weatherCode] && (
              <img src={`./images/${weatherValues.icons[weatherData.weatherCode]}`} width="100px" alt="weather-icon" />
            )}
          </div>
        </div>
      </>
  );
};

export default CurrentWeather;
