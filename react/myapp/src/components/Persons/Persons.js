import React from 'react';
import Person from './Person/Person';

const persons = (props) => props.persons.map((person, index) => {
        return <Person
          func1={() => props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={(event) => props.changed(event, person.id)}>
          This is state test with child and click event and also input
        </Person>
      });

export default persons;