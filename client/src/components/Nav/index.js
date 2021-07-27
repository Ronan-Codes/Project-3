import React, {useState} from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <nav className="navbar mainNav" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item">
                    <h1 className="title appName has-text-light">Pic'd Up</h1>
                </div>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                    data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start"></div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {loggedIn ? <Link to="/dashboard">
                                <i className="fas fa-home is-size-3 has-text-light"></i>
                                </Link> : <Link to="/">
                                <i className="fas fa-home is-size-3 has-text-light"></i>
                            </Link>} 
                            {loggedIn ? 
                            <a className="button clearColor">
                                <i className="fas fa-user-circle is-size-3 has-text-light"></i>
                            </a>: ''}
                            {loggedIn ? <a className="button clearColor">
                                <i className="fas fa-sign-in-alt is-size-3 has-text-light"></i>
                            </a>
                            : ''}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
  );
}

export default Nav;
