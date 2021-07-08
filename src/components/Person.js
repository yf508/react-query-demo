import React from 'react';

const Person = ({ person }) => {
  return (
    <div className="card">
      <h3>{ person.title }</h3>
      <p>ID - { person.id }</p>
      <p>urn - { person.urn }</p>
    </div>
  );
}
 
export default Person;