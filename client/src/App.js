import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import SearchPage from './pages/SearchPage';
//import NotFound from './pages/NotFound';
import './pages/SearchPage.css';
import './pages/WeatherPage.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path='/weather/' element={<WeatherPage />} />
      </Routes>
    </Router>
  );
};

export default App;
