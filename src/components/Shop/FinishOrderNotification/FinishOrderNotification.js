import React, { Component } from 'react';

import Auxi from '../../../hoc/Auxi/Auxi.js';
import Button from '../../UI/Button/Button';

// Returns an Order Summary
class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    render () {
        //Maps the products you selected in order to know the quantity, and price

        return (
            <Auxi>
                <h3>Order has been processed!</h3>

                <Button btnType="Success" clicked={this.props.purchaseContinued}>OK</Button>
            </Auxi>
        );
    }
}

export default OrderSummary;