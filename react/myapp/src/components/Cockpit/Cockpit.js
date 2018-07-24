import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    const assignedClasses = []
    let btnClass = '';
    if (props.showPersons){
        btnClass = classes.Red;
    }    
    if (props.persons.length <= 2){
      assignedClasses.push(classes.red); // classes = ['red']
    }
    if (props.persons.length <= 1){  
      assignedClasses.push(classes.bold); // classes = ['red','bold']
    }

    return (
        <div className={classes.Cockpit}>
            <h1>This is react App !!!</h1>
            <p className={assignedClasses.join(' ')}>This h1 has styles applied from class</p>
            <button
                className={btnClass}
                onClick={props.clicked}>
                Toggle Div
            </button>
        </div>
    );
};

export default cockpit;