import React from 'react';
import Loading from './Loading';

const WeatherDetails = ({ cityName, time, temperature, weatherCode, weatherValues, windSpeed, humidity }) => (
  <>
    <div className="d-flex">
      {cityName ? <h6 className="flex-grow-1" id="cityName">{cityName}</h6>:""}
      {time ? <h6 id="time">{time}</h6>:""}
    </div>
    <div className="d-flex flex-column text-center mt-5 mb-4">
      {temperature ? (<h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }} id="temperature">{temperature}°C</h6>):""}
      <span className="small" style={{ color: '#868B94' }}>
        {weatherValues?.descriptions?.[weatherCode] || <Loading />}
      </span>
    </div>
    <div className="d-flex align-items-center">
      <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
        <div className="d-flex">
          <img src="./images/wind.png" className="my-auto" width="24px" height="24px" alt="wind-speed-icon" data-toggle="tooltip" data-placement="top" title="Wind Speed" />
          {windSpeed ? <span className="ms-1" id="windSpeed">{windSpeed} km/h</span>:""}
        </div>
        <div className="d-flex">
          <img src="./images/humidity.png" className="my-auto" width="20px" height="20px" alt="humidity-icon" data-toggle="tooltip" data-placement="top" title="Humidity" />
          {humidity ? <span className="ms-2" id="humidity">{humidity}%</span>:""}
        </div>
      </div>
      {weatherValues?.icons?.[weatherCode] && (
        <img src={`./images/${weatherValues.icons[weatherCode]}`} width="100px" alt="weather-icon" />
      )}
    </div>
  </>
);

export default WeatherDetails;
