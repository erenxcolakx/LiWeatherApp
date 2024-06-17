import axios from "axios";
import {WeatherHelper, ApiOperations, format_time, get_avg_windspeed} from "../model/data.js";


const weatherHelper = new WeatherHelper();
const apiOperations = new ApiOperations();

const API_URL = apiOperations.API_URL;
const current = apiOperations.current;
const daily = apiOperations.daily;
const hourly = apiOperations.hourly;
const timezone = apiOperations.timezone;
const forecast_days = apiOperations.forecast_days;
const weatherCodes = weatherHelper.weatherCodes;
const weatherValues = weatherHelper.weatherValues;

const getSearchPage = async (req,res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
      res.render('error.ejs', {
        status: error.status,
        message: error.message,
      });
    }
}
const getWeather = async  (req, res) => {
    try {
      // Retrieve query parameters from the request
      const latitude = req.query.latitude;
      const longitude = req.query.longitude;
      const cityName = req.query.cityName;

      const response = await axios.get(API_URL
        + `latitude=${latitude}&longitude=${longitude}`
        + `&current=${current}`
        + `&daily=${daily}`
        + `&hourly=${hourly}`
        + `&timezone=${timezone}`
        + `&forecast_days=${forecast_days}`
      );

      const formattedTime = format_time(response.data.utc_offset_seconds);
      const averagesArray = get_avg_windspeed(response.data.hourly.wind_speed_10m,forecast_days);
      // Get the current weather data from API response
      res.render("weather.ejs", {
        temperature: response.data.current.temperature_2m,
        windSpeed: response.data.current.wind_speed_10m,
        humidity: response.data.current.relative_humidity_2m,
        weatherCodes: weatherCodes,
        weatherCode: response.data.daily.weather_code[0],
        weatherValues: weatherValues,
        time: formattedTime,
        cityName: cityName,
        weekly_data: response.data.daily,
        averageWeeklyWindSpeed: averagesArray
      });
    }
    catch (error) {
      res.render('error.ejs', {
        status: error.status,
        message: error.message,
      });
    }
  }

export{getSearchPage,getWeather}