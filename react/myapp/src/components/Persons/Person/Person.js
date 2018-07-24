import React from 'react';
import classes from './Person.css';

const person = (props) => { 
    // const persondiv = 'person-div'
    // const personchildren = 'person-children'

    return (
        <div className={classes.personDiv}>
            <p className={classes.person} onClick={props.func1}>I'm {props.name} and I am  {props.age} year old</p>
            <p className={classes.personChildren}>{props.children}</p>  
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};

export default person;