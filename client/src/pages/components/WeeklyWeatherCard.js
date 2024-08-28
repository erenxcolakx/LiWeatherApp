import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const WeeklyWeatherCard = ({ time, weatherCode, maxTemp, minTemp, avgWindSpeed, weatherValues }) => {

  const dateObject = new Date(time);
  const dayName = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
  return (
      <li className="list-card">
        <div>
          <p className="text-center">
            <span className="text-black-90 fw-bold">{dayName}</span> <br /> {time.slice(5)}
          </p>
        </div>
        <div className="text-center">
          {weatherValues?.icons?.[weatherCode] && (
            <img src={`../images/${weatherValues.icons[weatherCode]}`} width="50px" alt="weather-icon" />
          )}
          <p style={{ fontSize: '14px' }} className="mt-2" data-toggle="tooltip" data-placement="top" title="Max/Min Temperature">
            {maxTemp} / {minTemp} °C
          </p>
        </div>
        <div data-toggle="tooltip" data-placement="top" title="Avg. Wind Speed">
          <div className='d-flex align-content-center justify-content-center gap-1' >
            <img src="../images/wind.png" width="20px" height="20px" alt="wind-speed-icon" />
            <p style={{ fontSize: '12px' }}>{avgWindSpeed} km/h</p>
          </div>
        </div>
      </li>
  );
};

export default WeeklyWeatherCard;
