import InputGroup from '../../components/InputGroup/InputGroup';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';

const TravelSearchForm = ({ onSearch }) => {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    // You can perform the search and call the onSearch function with the search parameters
    onSearch({ startingPoint, destination, date });
  };

  return (
    <div>
      <h2>Travel Search</h2>
      <div>
        <label>Starting Point:</label>
        <input
          type="text"
          value={startingPoint}
          onChange={(e) => setStartingPoint(e.target.value)}
        />
      </div>
      <div>
        <label>Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default TravelSearchForm;
