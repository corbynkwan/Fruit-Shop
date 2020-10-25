import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Apple', type: 'apple' },
    { label: 'Banana', type: 'banana' },
    { label: 'Grape', type: 'grape' },
    { label: 'Orange', type: 'orange' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <div>
        <span className = {classes.quantity}>Quantity</span>
        </div>

        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.productAdded(ctrl.type)}
                removed={() => props.productRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} 
                product = {props.products[ctrl.type]}/>
        ))}
                <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>

        <button 
            className={classes.OrderButton}
            disabled={props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;