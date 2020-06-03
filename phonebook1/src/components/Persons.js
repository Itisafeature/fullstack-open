import React from 'react';

const Persons = ({ persons, handleDelete }) => {
  return persons.map(person => (
    <div key={person.id}>
      <li>
        {person.name}: {person.number}{' '}
        <button onClick={handleDelete} data-id={person.id}>
          delete
        </button>
      </li>
    </div>
  ));
};

export default Persons;
