import React, { Component } from 'react';

import Auxi from '../../hoc/Auxi/Auxi.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import FinishOrder from '../../components/Burger/FinishOrderNotification/FinishOrderNotification';
import CancelOrder from '../../components/Burger/CancelOrderNotification/CancelOrderNotification';
import CreateAccountBox from '../../components/Login/CreateAccountBox/CreateAccountBox';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';



class ProductPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        PRODUCT_PRICES: null,
        products: null,
        totalPrice: 0.0,
        purchasable: true,
        purchasing: false,
        loading: false,
        error: false,
        purchased: false,
        cancelled: false 
    }

    // Setup to connect to the database and assign product prices, and names as soon as page loads. 
    componentDidMount () {
        axios.get( 'https://market-project-da10f.firebaseio.com//products.json' )
            .then( response => {
                this.setState( { products: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
        axios.get( 'https://market-project-da10f.firebaseio.com//product_prices.json' )
            .then( response => {
                this.setState( { PRODUCT_PRICES: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
        } );
    }

    updatePurchaseState ( products ) {
        const sum = Object.keys( products )
            .map( igKey => {
                return products[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
    }

    addProductHandler = ( type ) => {
        const oldCount = this.state.products[type];
        const updatedCount = oldCount + 1;
        const updatedproducts = {
            ...this.state.products
        };
        updatedproducts[type] = updatedCount;
        const priceAddition = this.state.PRODUCT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, products: updatedproducts } );
        this.updatePurchaseState( updatedproducts );
    }

    removeProductHandler = ( type ) => {
        const oldCount = this.state.products[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedproducts = {
            ...this.state.products
        };
        updatedproducts[type] = updatedCount;
        const priceDeduction = this.state.PRODUCT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, products: updatedproducts } );
        this.updatePurchaseState( updatedproducts );
    }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false, cancelled: true } );
    }
    

    purchaseContinueHandler = () => {
        this.setState( { loading: true } );
        const order = {
            products: this.state.products,
            price: this.state.totalPrice,
            customer: {
                name: 'CustomerName',
                address: {
                    street: 'Test Street',
                    zipCode: '0000',
                    country: 'Hong Kong'
                },
                email: 'testy@Testmail.com'
            },
            deliveryMethod: '1 day'
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false, purchasing: false,purchased: true } );

            } )
            .catch( error => {
                this.setState( { loading: false, purchasing: false } );
            } );
    }
    verifyFinishOrderNotification = () => {
        this.setState( { purchased : false } );
    }
    verifyCancelledOrderNotification = () => {
        this.setState( { cancelled: false  } );
    }

    render () {
        const disabledInfo = {
            ...this.state.products
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let finishOrderNotification = null;
        let cancelOrderNotification = null; 
        let order = this.state.error ? <p>products can't be loaded!</p> : <Spinner />;

        if ( this.state.products ) {
            order = (
                <Auxi>
                    <BuildControls
                        productAdded={this.addProductHandler}
                        productRemoved={this.removeProductHandler}
                        disabled={disabledInfo}
                        purchasable={false}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} 
                        products = {this.state.products}
                        />
                        
                </Auxi>
            );
            orderSummary = <OrderSummary
                products={this.state.products}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
            finishOrderNotification = <FinishOrder 
                purchaseContinued={this.verifyFinishOrderNotification}
            ></FinishOrder>
            cancelOrderNotification = <CancelOrder 
                purchaseCancelled={this.verifyCancelledOrderNotification}
            ></CancelOrder>
            
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        return (
            <Auxi>
                {/* Shows summary when clicking continue closes when you clicked ok, and immediately opens the finishOrderNotification*/}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Modal show={this.state.purchased} modalClosed={this.verifyFinishOrderNotification}>
                    {finishOrderNotification}
                </Modal>
                <Modal show={this.state.cancelled} modalClosed={this.verifyCancelledOrderNotification}>
                    {cancelOrderNotification}
                </Modal>
                {order}
            </Auxi>
        );
    }
}

export default withErrorHandler(ProductPage, axios );