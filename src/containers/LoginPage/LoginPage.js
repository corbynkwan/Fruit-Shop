import React, { Component } from 'react';

import Auxi from '../../hoc/Auxi/Auxi.js';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import LoginBox from '../../components/Login/LoginBox/LoginBox'
import CreateAccountBox from '../../components/Login/CreateAccountBox/CreateAccountBox'
import LoggedInNotification from '../../components/Login/LoggedInNotification/LoggedInNotification'
import CreatedAccountNotification from '../../components/Login/CreatedAccountNotification/CreatedAccountNotification'
import Spinner from '../../components/UI/Spinner/Spinner';

//Login page that contains a LoginBox where users can create an account or login. Shows a notification if 1. wrong username/password is inputted 2. Created an account successfully
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
        loading: false,
        createdAccount: false,
        loggedIn: false,
        verifyLogin: false,
        verifyCreatedAccount: false,
        incorrectAccount: false
    }
    //Get information (user and pass) of all accounts from the server.
    componentDidMount () {
        axios.get( 'https://market-project-da10f.firebaseio.com//accounts.json' )
            .then( response => {
                if(response.data== null) { 
                    this.setState( { accounts: []} );

                } else{
                this.setState( { accounts: response.data } );
                }
            } )
            .catch( error => {
            } );
    }

    // Updates the 'password' state when the user types on the 'password' textbox
    passwordHandler = async event => {
        let accountCopy = {...this.state.loginAccount}
        accountCopy.password = event.target.value
        await this.setState( {
            loginAccount: accountCopy
            }
        );
    } 

    // Updates the 'username' state when the user types on the 'username' textbox
    userNameHandler = async event => {
        let accountCopy = {...this.state.loginAccount}
        accountCopy.userName = event.target.value
        await this.setState( {
            loginAccount: accountCopy
            }
        );
    }     
    // Verifies if the inputted username and password are correct when the 'Login' button is clicked
    loginAccountHandler = async() => {
        this.setState( {loading:true}); 
        const response = await axios.get( 'https://market-project-da10f.firebaseio.com//accounts.json' )
        .then( response => {
            if(response.data== null) { 
                this.setState( { accounts: []} );
            } else{
            this.setState( { accounts: response.data } );
            }
        } )
        .catch( error => {
        } );
        this.setState( {loading:false}); 

        Object.keys(this.state.accounts).forEach(key => {
            if(this.state.accounts[key].userName == this.state.loginAccount.userName && this.state.accounts[key].password == this.state.loginAccount.password) { 
                this.setState({loggedIn: true, verifyLogin: true})
            }
          });
          if(this.state.verifyLogin == false) { 
              this.setState({incorrectAccount:true}) 
          }
    }
    // Changes 'username' state for a new user whenever a 'username' is inputted
    newPasswordHandler = async event => {
        let accountCopy = {...this.state.loginAccount}
        accountCopy.password = event.target.value
        await this.setState( {
            newAccount: accountCopy
            }
        );
    }
    // Changes 'password' state for a new user whenever a 'password' is inputted
    newUserNameHandler = async event => {
        let accountCopy = {...this.state.loginAccount}
        accountCopy.userName = event.target.value
        await this.setState( {
            newAccount: accountCopy
            }
        );
    }
    // Verifies if the inputted username and password and creates a new account and add it's to the database when the 'Create Account' button is clicked inside the CreateAccountBox popup
    createAccountHandler = (event) => {
        this.setState ({createBoxClicked : false, verifyCreatedAccount: true})
        axios.post( '/accounts.json', this.state.newAccount )
            .then( response => {
            } )
            .catch( error => {
            } );
    }
    // Opens the CreateAccountBox popup when 'Create Account' is clicked 
    openCreateAccountBoxHandler = () => {
        this.setState( { createBoxClicked: true } );
    }
    // Changes the state of verifyLogin to false so that we can use this value to close the LoginBox container 
    verifyLogin = () => { 
        this.setState({verifyLogin: false})
    }
    // Changes the state of verifyLogin to false so that we can use this value to close the LoginBox container 
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
        let spinner = <Spinner />;

        {/* LoginPage returns a LoginBox with popups that show up when specific conditions are met i.e. user clicks 'Create Account' button*/}
        return (
            <Auxi>
                <Modal show={this.state.loading} >
                    {spinner}                
                </Modal>

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