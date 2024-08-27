import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://li-weather-app.vercel.app'
  : 'http://localhost:5000';

const getWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(`${API_URL}/api/weather`, {
        params: {
          latitude,
          longitude,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };
export default getWeatherData;