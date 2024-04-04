const API_URL = "https://api.open-meteo.com/v1/forecast?";

const current =["temperature_2m","apparent_temperature","rain,snowfall","weather_code","wind_speed_10m","relative_humidity_2m","is_day"];
const daily =["weather_code","temperature_2m_max","temperature_2m_min","wind_speed_10m_max","sunshine_duration","rain_sum",];
const timezone = "auto";
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

class WeatherHelper {
  constructor() {
    this.weatherCodes =  weatherCodes;
    this.weatherValues = weatherValues;
  }
}
class ApiOperations {
  constructor() {
    this.API_URL = API_URL;
    this.current =  current;
    this.daily = daily;
    this.forecast_days = forecast_days;
    this.timezone = timezone;
  }
}
function format_time(utc_offset_seconds) {
      const currentDate = new Date();
      const utcHour = currentDate.getUTCHours();
      const utcMinute = currentDate.getUTCMinutes();
      const utcOffsetInHours = utc_offset_seconds / 3600;
      // utcOffsetInMinutes değerini hesapla
      const utcOffsetInMinutes = utcOffsetInHours * 60;
      // final_hour'u saat ve dakika ofsetleriyle hesaplama
      let final_hour = utcHour + Math.floor(utcOffsetInHours);
      let final_minute = utcMinute + (utcOffsetInMinutes % 60);
      if(final_minute >= 60) {
        final_hour++;
        final_minute -= 60;
      }
      // 24 saatlik döngüyü sağlamak için mod işlemi
      final_hour = (final_hour + 24) % 24;
      return `${final_hour}:${final_minute < 10 ? '0' : ''}${final_minute}`;
}
export { WeatherHelper , ApiOperations, format_time }