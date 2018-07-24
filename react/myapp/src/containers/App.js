import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons:[
      {id:'a1',name:"Mayur", age:"35"},
      {id:'a2',name:"Suraj", age:"30"},
      {id:'a3',name:"Raj", age:"40"},
    ],
    otherState: 'some other value',
    showPersons: true
  }

  nameChanedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p =>{return p.id === id});
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] =person;
    this.setState({persons: persons})
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow});
  }

  render() {
    let persons = null;
    if (this.state.showPersons){
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChanedHandler} />;
    }    
    return (      
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons} 
          clicked={this.togglePersonsHandler}/>
        {persons}
      </div>      
    );
  }
}

export default App;
