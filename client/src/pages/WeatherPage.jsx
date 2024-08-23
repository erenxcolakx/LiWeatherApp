import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './WeatherPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Loading from './components/Loading.js';
import { getWeather } from '../api/weatherApi';
import BackButton from './components/BackButton.js';


const WeatherPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const latitude = queryParams.get('latitude');
  const longitude = queryParams.get('longitude');
  const cityName = queryParams.get('cityName');

  const [time, setTime] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weatherCode, setWeatherCode] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [humidity, setHumidity] = useState('');
  const [weatherValues, setWeatherValues] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  const [averageWeeklyWindSpeed, setAverageWeeklyWindSpeed] = useState([]);
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    if (latitude && longitude) {  // Eğer latitude ve longitude varsa
      console.log("LAtitude var")
      fetchWeatherData(latitude, longitude);
    }
  }, [latitude, longitude]);

  const scrollHorizontally = (event) => {
    event.preventDefault();
    const container = event.currentTarget;
    const delta = Math.max(-1, Math.min(1, event.deltaY));
    container.scrollLeft += delta * 50;
  };


  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const weatherData = await getWeather(latitude, longitude);
      setWeatherData(weatherData)

      setTemperature(weatherData.temperature);
      setTime(weatherData.time);
      setWeatherCode(weatherData.weatherCode);
      setWindSpeed(weatherData.windSpeed);
      setHumidity(weatherData.humidity);

      setWeeklyData(weatherData.weekly_data);
      setAverageWeeklyWindSpeed(weatherData.averageWeeklyWindSpeed);

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

      setWeatherValues({ descriptions: weatherDescriptions, icons: weatherIcons });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    if (weatherData) {
      const currentDate = new Date(); // Şu anki tarihi alıyoruz

// time formatını "21:11" formatından saat ve dakika olarak ayırıyoruz
      let [hours, minutes] = weatherData.time.split(':').map(Number);

      // Mevcut tarih üzerinde saat ve dakikayı ayarlıyoruz
      currentDate.setHours(hours);
      currentDate.setMinutes(minutes);
      currentDate.setSeconds(0); // Saniyeyi sıfırlıyoruz, çünkü elimizde saniye bilgisi yok

      const localTime = currentDate; // Şimdi localTime, weatherData.time'daki saati gösteren Date objesi
      hours = localTime.getHours().toString().padStart(2, '0'); // Saat bilgisini alıp 2 basamaklı hale getiriyoruz
      minutes = localTime.getMinutes().toString().padStart(2, '0'); // Dakika bilgisini alıp 2 basamaklı hale getiriyoruz

// Saat ve dakika bilgilerini "HH:MM" formatında birleştiriyoruz
      const updateLocalTime = () => {
        const hours = localTime.getHours().toString().padStart(2, '0'); // Saat bilgisini alıp 2 basamaklı hale getiriyoruz
        const minutes = localTime.getMinutes().toString().padStart(2, '0'); // Dakika bilgisini alıp 2 basamaklı hale getiriyoruz
        setTime(`${hours}:${minutes}`);
      };
  
      updateLocalTime();
  
      const interval = setInterval(() => {
        localTime.setMinutes(localTime.getMinutes() + 1); // Saati 1 dakika ileri alıyoruz
        updateLocalTime();
      }, 60000); // Her 60 saniyede bir güncellenir
  
      return () => clearInterval(interval); // Bileşen kaldırıldığında interval'i temizliyoruz
    }
  }, [weatherData]);
  
  // Render işlemi burada...

  return (
  <div className={`wp ${weatherData.isDay ?  'wp-background sunset' : 'wp-background night'}`}>
    <div className="container h-100">
      <BackButton route={'/'}/>
      <div className="row d-flex h-100 justify-content-center">
        <div className="col-md-10 my-5">
          <div className="card" style={{ borderRadius: '35px' }}>
            <div className="card-body p-4">
              <div className="d-flex">
                {cityName ? (<h6 className="flex-grow-1" id="cityName">{cityName}</h6>): ""}
                {time ? (<h6 id="time">{time}</h6>): ""}
              </div>
              <div className="d-flex flex-column text-center mt-5 mb-4">
                {temperature ? (<h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }} id="temperature">{temperature}°C</h6>): ""}
                <span className="small" style={{ color: '#868B94' }}>
                  {weatherValues?.descriptions?.[weatherCode] || <Loading/>}
                </span>
              </div>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                  <div className="d-flex">
                    <img src="./images/wind.png" className="my-auto" width="24px" height="24px" alt="wind-speed-icon" data-toggle="tooltip" data-placement="top" title="Wind Speed" />
                    {windSpeed ? (<span className="ms-1" id="windSpeed">{windSpeed} km/h</span>): ""}
                  </div>
                  <div className="d-flex">
                    <img src="./images/humidity.png" className="my-auto" width="20px" height="20px" alt="humidity-icon" data-toggle="tooltip" data-placement="top" title="Humidity" />
                    {humidity ? (<span className="ms-2" id="humidity">{humidity}%</span>) : ""}
                  </div>
                </div>
                <div>
                  {weatherValues?.icons?.[weatherCode] && (
                    <img src={`./images/${weatherValues.icons[weatherCode]}`} width="100px" alt="weather-icon" />
                  )}
                </div>
              </div>
              <section id="weekly">
                <div className="horizontal-scroll-container" onWheel={(e) => scrollHorizontally(e)}>
                  <ul className="horizontal-list">
                    {weeklyData?.time && weeklyData.time.map((time, i) => {
                      const dateObject = new Date(time);
                      const dayName = dateObject.toLocaleDateString('en-US', { weekday: 'long' });
                      return (
                        <li className="list-card" key={i}>
                          <div>
                            <p className="text-center">
                              <span className="text-black-90 fw-bold">{dayName}</span> <br /> {time.slice(5)}
                            </p>
                          </div>
                          <div className="text-center">
                            {weatherValues?.icons?.[weeklyData.weather_code[i]] && (
                              <img src={`./images/${weatherValues.icons[weeklyData.weather_code[i]]}`} width="50px" alt="weather-icon" />
                            )}
                            <p style={{ fontSize: '14px' }} className="mt-2" data-toggle="tooltip" data-placement="top" title="Max/Min Temperature">
                              {weeklyData.temperature_2m_max[i]} / {weeklyData.temperature_2m_min[i]} °C
                            </p>
                          </div>
                          <div data-toggle="tooltip" data-placement="top" title="Avg. Wind Speed">
                            <p className="text-center" style={{ fontSize: '12px' }}>
                              <img src="./images/wind.png" width="20px" height="20px" alt="wind-speed-icon" />
                              {averageWeeklyWindSpeed[i]} km/h
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
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

export default WeatherPage;
