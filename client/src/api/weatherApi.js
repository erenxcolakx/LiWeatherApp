// api/weatherApi.js
import axios from 'axios';

export const getWeather = async (latitude, longitude) => {
  const response = await axios.get('/api/weather', {
    params: {
      latitude,
      longitude,
    }
  });
  return response.data;
};
