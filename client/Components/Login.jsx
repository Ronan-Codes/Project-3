import React from 'react';

function Login() {
    return (
        <section class="hero is-fullheight loginFormWrapper">
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered">
                        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                            <section action="" class="box">
                                <form class="loginForm">
                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <input id="loginEmail" type="email" placeholder="Email" class="input" required />
                                            <span class="icon is-small is-left">
                                                <i class="fa fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <input id="loginPassword" type="password" placeholder="Password" class="input" required />
                                            <span class="icon is-small is-left">
                                                <i class="fa fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="field has-text-centered">
                                        <button class="button is-success">
                                            Login
                                        </button>
                                    </div>
                                </form>

                                <form class="signupForm">
                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <input id="signupUserName" type="email" placeholder="Username" class="input" required />
                                            <span class="icon is-small is-left">
                                                <i class="fa fa-user"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <input id="signupEmail" type="email" placeholder="Email" class="input" required />
                                            <span class="icon is-small is-left">
                                                <i class="fa fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <input id="signupPassword" type="password" placeholder="Password" class="input" required />
                                            <span class="icon is-small is-left">
                                                <i class="fa fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                        
                                    <div class="field has-text-centered">
                                        <button class="button is-success">
                                            Sign up
                                        </button>
                                    </div>
                                </form>

                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;