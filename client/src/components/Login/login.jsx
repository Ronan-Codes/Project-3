import React, { useState } from "react";
import { LOGIN } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import AuthService from '../../utils/auth';
import './style.css'

const Login = (props) => {
    const [login, { error }] = useMutation(LOGIN);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [formState, setFormState] = useState({ email: '', password: '' });



    const showSignup = () => {
        props.changeSignup(true);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: {
                    email: email,
                    password: password
                },
            });
            const token = mutationResponse.data.login.token;
            AuthService.login(token);
            window.location.assign('/');
        } catch (e) {
            console.log(e);
        }

        if (!email || !password) {
            alert('Missing Email Address or Password') //Or some modal popup
            return
        }
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
                                    <div class="has-text-centered"><a onClick={showSignup}>Signup?</a></div>
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