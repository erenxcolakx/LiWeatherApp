import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const SearchPage = () => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchSuggestions = async () => {
      if (city.length === 0) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=50&language=en&format=json`);
        const suggestions = response.data.results.map((result) => ({
          id: result.id,
          name: result.name,
          country: result.admin1 || '',
          latitude: result.latitude,
          longitude: result.longitude,
        }));
        setSuggestions(suggestions);
      } catch (error) {
        console.error(error);
        setSuggestions([{ id: 'error', name: 'Could not find the city. Please try again.', country: '' }]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [city]);

  const handleInputChange = useCallback((e) => {
    setCity(e.target.value);
  }, []);

  

  return (
  <div className='sp sp-background'>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col card-weather">
        <div className="col-12 my-auto">
          <h1 className="pacifico text-center mt-5 mt-lg-5" style={{ fontSize: '64px' }}>Liweather</h1>
        </div>
        <div className="d-flex flex-column align-items-center my-auto mt-4">
          <label htmlFor="citySearch" className="row text-center mt-3">Search for a city:</label>
          <input
            type="text"
            id="citySearch"
            value={city}
            onChange={handleInputChange}
            autoComplete="off"
            className="row col-6 mt-4 mb-2 top-bar ps-3 border-black"
          />
        </div>
        <div className="container pb-2">
          <div className="scrollable-list mx-auto">
            {loading && <p>Loading...</p>}
            <ul id="exampleCities">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id}>
                  <Link
                    to={`/weather?latitude=${suggestion.latitude}&longitude=${suggestion.longitude}&cityName=${encodeURIComponent(suggestion.name)}`}
                    className='custom-link'
                  >
                   {suggestion.name}{suggestion.country ? `, ${suggestion.country}` : ''}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default React.memo(SearchPage);
