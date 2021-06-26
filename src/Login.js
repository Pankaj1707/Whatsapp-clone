import React from 'react'
import "./Login.css";
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import { useStateValue } from "./StateProvider"
import { actionTypes } from './reducer';



function Login() {

    const [{ }, dispatch] = useStateValue();

    function signIn() {
        auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch(err => alert(err.message));
    };

    return (

        <div className="login">
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png">

                </img>
                <h1> Sign in to whatsapp</h1>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>

        </div>
    )
}

export default Login
