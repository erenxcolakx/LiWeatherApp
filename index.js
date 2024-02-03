import express from "express";
import axios from "axios";
const app = express();
const port =  process.env.PORT || 3000;
const API_URL = "https://api.open-meteo.com/v1/forecast?";

const current =["temperature_2m","apparent_temperature","rain,snowfall","weather_code","wind_speed_10m","relative_humidity_2m","is_day"];
const daily =["weather_code","temperature_2m_max","temperature_2m_min","wind_speed_10m_max","sunshine_duration","rain_sum",];
const timezone = "Europe%2FMoscow";
const forecast_days = 14;


const weatherCodes = {
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

const weatherValues = {
    "0, 1": "sunny.png",
    "2": "partly-cloudy.gif",
    "3": "overcast.png",
    "45, 48": "foggy.png",
    "51, 53, 55, 56, 57": "drizzle.png",
    "61, 63, 65, 66, 67, 80, 81, 82": "rainy.png",
    "71, 73, 75, 85, 86": "snowfall.png",
    "77": "snow.png",
    "95, 96, 99": "thunderstorm.gif",
  };
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');


app.get("/", async (req,res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
      res.render('error.ejs', {
        status: error.status,
        message: error.message,
      });
    }
});

app.get("/weather", async (req, res) => {
  try {
    // Retrieve query parameters from the request
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const cityName = req.query.cityName;

    const response = await axios.get(API_URL
      + `latitude=${latitude}&longitude=${longitude}`
      + `&current=${current}`
      + `&daily=${daily}`
      + `&timezone=${timezone}`
      + `&forecast_days=${forecast_days}`
    );

    const userLocalTime = new Date();
    // Format the time
    const hours = userLocalTime.getHours();
    const minutes = userLocalTime.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

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
    });
  } catch (error) {
    res.render('error.ejs', {
      status: error.status,
      message: error.message,
    });
  }
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
