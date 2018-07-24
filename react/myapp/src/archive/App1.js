import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

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
      {name:"Bhagya", age:"36"},
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

    let persons_div = null;
    if (this.state.showPersons){
      persons_div = (
        <div onMouseLeave={this.switchNameHandler.bind(this,'Rajendra')}> {/*This is 1 way to bind parameters*/}
        <Person
          // State 
          // className="App-state"  this is not working
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}>
          This is state test with child
        </Person>
        <Person
          // Passing method from class component using props and this().
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          // Below is 2nd way to bind parameters (not recommended can be inefficient)
          func={()=> this.switchNameHandler('Rajendra_!!!')}// This will trigger function
          changed={this.nameChanedHandler}>
          This is state test with child and click event and also input
        </Person>
        <Person 
          // Props
          name="Manju" 
          age="27"> This is props test with child</Person>  
        <Person 
          // Properties
          name={this.name} 
          age={this.age}>This is properties test with child
        </Person>
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
