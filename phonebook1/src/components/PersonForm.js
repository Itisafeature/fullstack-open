import React from 'react';

const PersonForm = ({
  handleNumberChange,
  handleNameChange,
  handleClick,
  newName,
  newNumber,
}) => (
  <form>
    <div>
      name: <input onChange={handleNameChange} value={newName} />
      number: <input onChange={handleNumberChange} value={newNumber} />
    </div>
    <div>
      <button onClick={handleClick} type="submit">
        add
      </button>
    </div>
  </form>
);

export default PersonForm;
