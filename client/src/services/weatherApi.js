import axios from 'axios';

const getWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get('/api/weather', {
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