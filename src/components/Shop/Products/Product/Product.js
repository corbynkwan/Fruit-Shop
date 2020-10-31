import React from 'react';

import classes from './Product.css';

// Products is a class that returns a single product. 
const product = (props) => (
    <div className={classes.Product}>
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

export default product;