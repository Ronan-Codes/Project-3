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
            <section className="hero is-fullheight loginFormWrapper">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                <section className="box">
                                    <div className="loginForm">
                                        <div className="field">
                                            <div className="control has-icons-left">
                                                <input id="loginEmail" type="email" placeholder="Email" className="input" required
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-envelope"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control has-icons-left">
                                                <input id="loginPassword" type="password" placeholder="Password" className="input" required
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-lock"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field has-text-centered">
                                            <button className="button is-success" onClick={handleLogin}>
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                    <div className="has-text-centered"><a onClick={showSignup}>Signup?</a></div>
                                    {error && <span className="is-size-6 errorColor">The provided credentials are incorrect. Try again or signup!</span>}
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