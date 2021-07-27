import React from 'react';

function Nav() {
    return (
        <nav class="navbar mainNav" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <h1 class="title appName has-text-light">Pic'd Up</h1>
                </div>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                    data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button clearColor">
                                <i class="fas fa-home is-size-3 has-text-light"></i>
                            </a>
                            <a class="button clearColor">
                                <i class="fas fa-user-circle is-size-3 has-text-light"></i>
                            </a>
                            <a class="button clearColor">
                                <i class="fas fa-sign-in-alt is-size-3 has-text-light"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;