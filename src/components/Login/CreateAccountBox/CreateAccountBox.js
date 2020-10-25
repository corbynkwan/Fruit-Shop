
import React from 'react'
import Auxi from '../../../hoc/Auxi/Auxi.js';
import classes from '../LoginBox/LoginBox.css';

const createAccountBox = (props) => { 
    return ( 
        <Auxi>
            <div className={classes.container}>
                <input onChange={props.newUserNameHandler} type="text" name="username" placeholder="Username" required></input>
                <input onChange={props.newPasswordHandler} type="password" name="password" placeholder="Password" required></input>
                <button 
                    className={classes.btn}
                    onClick={props.createAccountHandler}>Create Account
                </button>
            </div>
        </Auxi>

    )
}

export default createAccountBox