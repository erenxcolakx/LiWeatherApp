import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({route}) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(route)} className='navigatesp'>
      <i className="bi bi-arrow-left text-white"></i>
    </button>
  );
};

export default BackButton;
