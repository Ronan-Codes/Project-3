import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import axios from "axios";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const showSignup = () => {
        props.changeSignup(true);
    }

    const handleLogin = () => {
        history.push('/dashboard');
        return
        //do some type of error handling
        //verify the email and password is not blank
        //show an error if it is and return to exist
        if (!email || !password){
            alert('Missing Email Address or Password') //Or some fancy popup - react-popup, bulma probably has a modal, or bootstrap?
            return
        }

        //do the login
        //do some type of api call here - fetch/axios/something
        fetch("some url", {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            })
        }).then(response => response.json)
        .then(data => {
            console.log(data);
        })
        .catch(e => {
            console.log(e)
        })

        axios.post("some url", {
            email,
            password
        }).then(data => {
            console.log(data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
        <>
            <section class="hero is-fullheight loginFormWrapper">
                <div class="hero-body">
                    <div class="container">
                        <div class="columns is-centered">
                            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                                <section class="box">
                                    <div class="loginForm">
                                        <div class="field">
                                            <div class="control has-icons-left">
                                                <input id="loginEmail" type="email" placeholder="Email" class="input" required
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                                <span class="icon is-small is-left">
                                                    <i class="fa fa-envelope"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="control has-icons-left">
                                                <input id="loginPassword" type="password" placeholder="Password" class="input" required
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                                <span class="icon is-small is-left">
                                                    <i class="fa fa-lock"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field has-text-centered">
                                            <button class="button is-success" onClick={handleLogin}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                    <div><a onClick={showSignup}>Signup?</a></div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login