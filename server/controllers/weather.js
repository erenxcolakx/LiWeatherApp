import axios from "axios";
import {ApiOperations, format_time, get_avg_windspeed} from "../model/data.js";


const apiOperations = new ApiOperations();

const API_URL = apiOperations.API_URL;
const current = apiOperations.current;
const daily = apiOperations.daily;
const hourly = apiOperations.hourly;
const timezone = apiOperations.timezone;
const forecast_days = apiOperations.forecast_days;

const getWeather = async (req, res) => {
  try {
      const { latitude, longitude } = req.query;
      const response = await axios.get(API_URL
          + `latitude=${latitude}&longitude=${longitude}`
          + `&current=${current}`
          + `&daily=${daily}`
          + `&hourly=${hourly}`
          + `&timezone=${timezone}`
          + `&forecast_days=${forecast_days}`
      );

      const formattedTime = format_time(response.data.utc_offset_seconds);
      const averagesArray = get_avg_windspeed(response.data.hourly.wind_speed_10m, forecast_days);
      res.json({
          temperature: response.data.current.temperature_2m,
          windSpeed: response.data.current.wind_speed_10m,
          humidity: response.data.current.relative_humidity_2m,
          weatherCode: response.data.daily.weather_code[0],
          time: formattedTime,
          weekly_data: response.data.daily,
          averageWeeklyWindSpeed: averagesArray,
          isDay: response.data.current.is_day,
      });
  } catch (error) {
      res.status(500).json({
          status: error.status,
          message: error.message,
      });
  }
};

export{getWeather}