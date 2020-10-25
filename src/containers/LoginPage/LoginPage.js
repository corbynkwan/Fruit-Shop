import React, { Component } from 'react';

import Auxi from '../../hoc/Auxi/Auxi.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import LoginBox from '../../components/Login/LoginBox/LoginBox'
import CreateAccountBox from '../../components/Login/CreateAccountBox/CreateAccountBox'
import LoggedInNotification from '../../components/Login/LoggedInNotification/LoggedInNotification'
import CreatedAccountNotification from '../../components/Login/CreatedAccountNotification/CreatedAccountNotification'

class LoginPage extends Component { 
    state = {
        accounts: null,
        loginAccount: {
            userName: null,
            password: null
        },
        newAccount: {
            userName: null,
            password: null
        }, 
        createBoxClicked: false,
        createdAccount: false,
        loggedIn: false,
        verifyLogin: false,
        verifyCreatedAccount: false,
        incorrectAccount: false
    }
    //Get accounts information (user and pass)
    componentDidMount () {
        axios.get( 'https://market-project-da10f.firebaseio.com//accounts.json' )
            .then( response => {
                this.setState( { accounts: response.data } );
            } )
            .catch( error => {
            } );
    }




    passwordHandler = async event => {
        let accountCopy = {...this.state.loginAccount}
        accountCopy.password = event.target.value
        await this.setState( {
            loginAccount: accountCopy
            }
        );
    }    
    userNameHandler = async event => {
        let accountCopy = {...this.state.loginAccount}
        accountCopy.userName = event.target.value
        await this.setState( {
            loginAccount: accountCopy
            }
        );
    }    
    loginAccountHandler = () => {
        Object.keys(this.state.accounts).forEach(key => {

            if(this.state.accounts[key].userName == this.state.loginAccount.userName && this.state.accounts[key].password == this.state.loginAccount.password) { 
                this.setState({loggedIn: true, verifyLogin: true})
            }
          });
          if(this.state.verifyLogin == false) { 
              this.setState({incorrectAccount:true}) 
          }
        axios.post( '/accounts.json', this.state.newAccount )
            .then( response => {
            } )
            .catch( error => {
            } );
    }
    // Changes userName state whenever a username is inputted
    newPasswordHandler = async event => {
        let accountCopy = {...this.state.loginAccount}
        accountCopy.password = event.target.value
        await this.setState( {
            newAccount: accountCopy
            }
        );
    }
    // Changes password state whenever a username is inputted
    newUserNameHandler = async event => {
        let accountCopy = {...this.state.loginAccount}
        accountCopy.userName = event.target.value
        await this.setState( {
            newAccount: accountCopy
            }
        );
    }
    // Creates a new account when clicked
    createAccountHandler = (event) => {
        this.setState ({createBoxClicked : false, verifyCreatedAccount: true})

        axios.post( '/accounts.json', this.state.newAccount )
            .then( response => {
            } )
            .catch( error => {
            } );
    }
    openCreateAccountBoxHandler = () => {
        this.setState( { createBoxClicked: true } );
    }

    verifyLogin = () => { 
        this.setState({verifyLogin: false})
    }
    verifyCreatedAccount = () => { 
        this.setState({verifyCreatedAccount: false})
    }
    
    render () {
        let createAccountBox = <CreateAccountBox newUserNameHandler = {this.newUserNameHandler} newPasswordHandler = {this.newPasswordHandler} createAccountHandler = {this.createAccountHandler}/>
        let loginBox = <LoginBox incorrectAccount = {this.state.incorrectAccount}clicked = {this.openCreateAccountBoxHandler} userNameHandler = {this.userNameHandler} passwordHandler = {this.passwordHandler} loginAccountHandler = {this.loginAccountHandler}></LoginBox>
        let loggedinNotification = <LoggedInNotification clicked={this.verifyLogin}/>
        let createdAccountNotification = <CreatedAccountNotification clicked={this.verifyCreatedAccount}></CreatedAccountNotification>
        if(this.state.loggedIn) { 
            loginBox = null; 
        } 
        return (
            <Auxi>
                {loginBox}
                <Modal show={this.state.verifyLogin} >
                    {loggedinNotification}
                </Modal>
                <Modal show={this.state.createBoxClicked} modalClosed={this.state.createBoxClicked}>
                    {createAccountBox}
                </Modal>
                <Modal show={this.state.verifyCreatedAccount}>
                    {createdAccountNotification}
                </Modal>
            </Auxi>

        );
    }

}

export default LoginPage