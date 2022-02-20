import React from "react";
import Dashboard from "./Dashboard";
import DashboardLoggedOut from "./DashboardLoggedOut"
import AuthService from "../utils/auth"

const Home = (props) => {
    const loggedIn = AuthService.loggedIn()

    return (
        <>  
            {loggedIn ? <Dashboard/>
             : <DashboardLoggedOut/>
            } 
        </>
    )
}

export default Home