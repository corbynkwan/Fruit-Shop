import React, { useEffect } from 'react'
import Auxi from '../../../hoc/Auxi/Auxi.js';
import classes from '../LoginBox/LoginBox.css';
// Login box for 
const loginBox = (props) => { 
    let incorrectAccount = null;
    console.log(props)
    console.log(props.incorrectAccount)

    if(props.incorrectAccount) { 
        incorrectAccount = <p className ={classes.incorrect}>Incorrect username or password</p>
    } 

    return (
        <Auxi>
            <div className={classes.container}>
                <input onChange ={props.userNameHandler}type="text" name="username" placeholder="Username" required></input>
                <input onChange ={props.passwordHandler}type="password" name="password" placeholder="Password" required></input>
                {incorrectAccount}
                <button
                    className={classes.btn}
                    onClick={props.loginAccountHandler}>Login
                </button>
                <button 
                    className={classes.btn}
                    onClick={props.clicked}>Create Account
                </button>
            </div>
            
        </Auxi>

    )
}

export default loginBox