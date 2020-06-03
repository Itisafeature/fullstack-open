import React from 'react';
import axios from 'axios';

const create = personObj => {
  return axios.post('api/persons', personObj);
};

const updatePerson = foundPerson => {
  return axios.put(`/api/persons/${foundPerson.id}`, foundPerson);
};

const removePerson = id => {
  return axios.delete(`/api/persons/${id}`);
};

export default { create, removePerson, updatePerson };
