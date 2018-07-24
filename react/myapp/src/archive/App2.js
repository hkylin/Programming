import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js'

class App extends Component {

  // this will also work
   name = "Raj"
   age = "40"
  //state only works in component. it will pass current object properties to component
  state = {
    persons:[
      {name:"Mayur", age:"35"},
      {name:"Suraj", age:"30"},
    ],
    otherState: 'some other value',
    showPersons: true
  }

  switchNameHandler = (newName) =>{
   this.setState({
     persons:[
      {name:newName, age:"40"}, /*pass dinamic value from NewName*/
      {name:"switchNameHandler == Bhagya", age:"36"},
      ]
    })
  }

  nameChanedHandler = (event) => {
    this.setState({
      persons:[
        {name:"Mayur", age:"35"},
        {name:event.target.value, age:"30"},
      ]
    })
  }

  deletePersonHandler = (personIndex) =>{
    const persons = this.state.persons
    // const persons = this.state.persons.slice();
    // const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({person:persons});
  }

  togglePersonsHandler = () =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow});
  }

  render() {

    // in app css Example
    const CS_style ={
      border: '1px solid blue',
      borderRadius: '8px',
      backgroundColor:'lightblue'
    };
    const CS_style1 ={
      border: '1px solid green',
      borderRadius: '8px',
      backgroundColor:'lightGreen'
    };

    let persons_div = null;
    if (this.state.showPersons){
      persons_div = (
        <div onMouseLeave={this.switchNameHandler.bind(this,'switchNameHandler==Rajendra')}> {/*This is 1 way to bind parameters*/}
          {this.state.persons.map((person,index) => {
            return <Person
              // below function will apply to main peragraph
              func={() => this.switchNameHandler('switchNameHandler==Rajendra_!!!')}
              // below function will apply to whole persons array
              func1={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              // below function will appy to input
              changed={this.nameChanedHandler}>
              This is state test with child and click event and also input
            </Person>
          })}
            <div style={CS_style1}>
            <h4>This is separate div with style CS_style1 and has no events attached</h4>
            <p>Props</p>
            <Person
              name="Manju" 
              age="27"> This is props test with child
            </Person>  
            <p>Properties</p>
            <Person               
              name={this.name} 
              age={this.age}>This is properties test with child
            </Person>
            </div>
      </div> 
      );
    }
    
    return (
      <div className="App">
        <h1 style={CS_style}>This h1 has styles applied from class</h1>
        <button onClick={this.togglePersonsHandler}>Toggle Div</button>
        {persons_div}
          {/*this.state.showPersons ? : null /*else render() null*/}
      </div>
    );
  }
}

export default App;
