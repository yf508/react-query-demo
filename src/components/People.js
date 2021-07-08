import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Person from './Person';

const loadPeople = async () => {
  const res = await axios('https://api.artworld.hosted.york.ac.uk/searchOnly?keyword=&page=2&types[]=people&limit=20');
  return res.data.response;
}

const People = () => {
  const { data, status } = useQuery('people', loadPeople);

  return (
    <div>
      <h2>People</h2>

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error loading data</div>
      )}

      {status === 'success' && (
        <div>
          { data.results.map(person => <Person key={person.id} person={person} /> ) }
        </div>
      )} 
    </div>
  );
}
 
export default People;