import React, { useState } from "react";
import { ADD_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import AuthService from '../../utils/auth';

const SignUp = (props) => {
    const [formUsername, setUsername] = useState('');
    const [formPassword, setPassword] = useState('');
    const [formEmail, setEmail] = useState('');
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
                username: formUsername,
                email: formEmail,
                password: formPassword

            },
        });
        const token = mutationResponse.data.addUser.token;
        AuthService.login(token);
        window.location.assign('/dashboard');
        if (!formEmail || !formPassword || !formUsername) {
            alert('Missing Email Address or Username or Password') //Or some fancy popup - react-popup, bulma probably has a modal, or bootstrap?
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
                                    <div class="signupForm">
                                        <div class="field">
                                            <div class="control has-icons-left">
                                                <input id="signupUserName" type="text" placeholder="Username" class="input" required
                                                    value={formUsername}
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
                                                    value={formEmail}
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
                                                    value={formPassword}
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