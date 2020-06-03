import React from 'react';

const Search = ({ handleSearchChange, newSearch }) => (
  <input onChange={handleSearchChange} value={newSearch} />
);

export default Search;
