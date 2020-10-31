import React from 'react';

import classes from './BuildControl.css';

// BuildControls is a class that returns a single product. 
const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Less} 
            onClick={props.removed} 
            disabled={props.disabled}>Less</button>
        <button 
            className={classes.More} 
            onClick={props.added}>More</button>
        <span className = {classes.quantityValue}>{props.product}</span>
    </div>
);

export default buildControl;