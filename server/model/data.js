const API_URL = "https://api.open-meteo.com/v1/forecast?";

const current =["temperature_2m","apparent_temperature","rain,snowfall","weather_code","wind_speed_10m","relative_humidity_2m","is_day"];
const daily =["weather_code","temperature_2m_max","temperature_2m_min","wind_speed_10m_max","sunshine_duration","rain_sum",];
const hourly =["wind_speed_10m"]
const timezone = "auto";
const forecast_days = 14;

class ApiOperations {
  constructor() {
    this.API_URL = API_URL;
    this.current =  current;
    this.daily = daily;
    this.hourly = hourly;
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
// It takes speed values parameter according to day number which is will be shown
function get_avg_windspeed(windSpeedData,forecast_days){
  const segmentLength = 24; // In order to get 1 day of wind speed
  let dividedWindSpeedArray = [];
  // divide into the number of days and push dividedWindSpeedArray
  for (let i = 0; i < forecast_days; i++) {
    let segment = windSpeedData.slice(i * segmentLength, (i + 1) * segmentLength);
    dividedWindSpeedArray.push(segment);
  }
  //Get avg wind speed of each day
  let averagesArray = dividedWindSpeedArray.map(segment => {
    let sum = segment.reduce((acc, val) => acc + val, 0);
    return Math.floor((sum / segment.length)*10) / 10;
  });
  return averagesArray
}

export { ApiOperations, format_time, get_avg_windspeed}