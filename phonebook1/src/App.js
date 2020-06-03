import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Search from './components/Search';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/PersonService';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      const fetched = await axios.get('/api/persons');
      setPersons(persons.concat(fetched.data));
    })();
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const filteredPersons = () => {
    if (newSearch === '') return persons;
    return persons.filter(person => person.name.match(newSearch));
  };

  const addPerson = async event => {
    event.preventDefault();
    const foundPerson = persons.find(person => person.name === newName);
    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Would you like to replace the number?`
        )
      ) {
        try {
          const updatedPerson = await personService.updatePerson(foundPerson);
          setPersons(
            persons.map(person =>
              person.id !== updatedPerson.id ? person : updatedPerson.data
            )
          );
          setIsError(false);
          setMessage(`Updated ${updatedPerson.data.name}'s number`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        } catch (err) {
          setIsError(true);
          setMessage(`${err.response.data.error}}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        }
        setNewName('');
        setNewNumber('');
      }
    } else {
      const personObj = { name: newName, number: newNumber };
      try {
        const person = await personService.create(personObj);
        setIsError(false);
        setPersons(persons.concat(person.data.person));
        setMessage(`Added ${person.data.person.name} to phonebook`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (err) {
        setIsError(true);
        setMessage(`${err.response.data.error}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
      setNewName('');
      setNewNumber('');
    }
  };

  const handleDelete = event => {
    if (window.confirm('Are you sure you want to delete?')) {
      const id = event.target.dataset.id;
      personService.removePerson(id);
      setPersons(persons.filter(person => person.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Search handleSearchChange={handleSearchChange} newSearch={newSearch} />
      <PersonForm
        handleClick={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons()} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
