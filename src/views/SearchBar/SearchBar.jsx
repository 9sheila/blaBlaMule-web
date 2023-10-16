import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [startingPoint, setStartingPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    onSearch({ startingPoint, destination, date });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Starting Point"
        value={startingPoint}
        onChange={(e) => setStartingPoint(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
