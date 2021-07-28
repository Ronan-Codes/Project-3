import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ADD_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import AuthService from '../../utils/auth';

const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    // const history = useHistory();

    const showSignup = () => {
        props.changeSignup(false);
    }

    const handleSignup = async (event) => {

        // history.push('/dashboard');
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                username: formState.username,
                email: formState.email,
                password: formState.password,

            },
        });
        const token = mutationResponse.data.addUser.token;
        AuthService.login(token);
        if (!email || !password || !username) {
            alert('Missing Email Address or Username or Password') //Or some fancy popup - react-popup, bulma probably has a modal, or bootstrap?
            return
        }

        //do the sign up
        //do some type of api call here - fetch/axios/something
        // fetch("some url", {
        //     method: 'post',
        //     body: JSON.stringify({
        //         email,
        //         password
        //     })
        // }).then(response => response.json)
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(e => {
        //         console.log(e)
        //     })

        // axios.post("some url", {
        //     email,
        //     password
        // }).then(data => {
        //     console.log(data)
        // })
        //     .catch(e => {
        //         console.log(e)
        //     })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <>
            <section class="hero is-fullheight loginFormWrapper">
                <div class="hero-body">
                    <div class="container">
                        <div class="columns is-centered">
                            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                                <section class="box">
                                    <div class="signupForm">
                                        <div class="field">
                                            <div class="control has-icons-left">
                                                <input id="signupUserName" type="text" placeholder="Username" class="input" required
                                                    value={username}
                                                    onChange={e => setUsername(e.target.value)}
                                                />
                                                <span class="icon is-small is-left">
                                                    <i class="fa fa-user"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="control has-icons-left">
                                                <input id="signupEmail" type="email" placeholder="Email" class="input" required
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
                                                <input id="signupPassword" type="password" placeholder="Password" class="input" required
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                                <span class="icon is-small is-left">
                                                    <i class="fa fa-lock"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field has-text-centered">
                                            <button class="button is-success" onClick={handleSignup}>
                                                Sign up
                                            </button>
                                        </div>
                                    </div>
                                    <div class="has-text-centered"><a onClick={showSignup}>Login</a></div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp