import './App.css';
import React, { useState, useEffect } from "react";
import DoLogin from "./login.js"

import {
    Switch,
    Route,
    NavLink,
    useLocation,
    useHistory
} from "react-router-dom";


function App() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    let history = useHistory();
    const goHome = () => {
        history.push("/");
    }
    return (
        <div>
            <Header loginMsg={
                isLoggedIn ? "Logout" : "Login"
            }
                isLoggedIn={isLoggedIn} />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/login">
                    <DoLogin loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} goHome={goHome} />
                </Route>

                <Route>
                    <NoMatch />
                </Route>
            </Switch>
        </div>

    );
}

function Header({ isLoggedIn, loginMsg }) {
    return (
        <ul className="header">
            <li>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
            </li>

            <li>
                <NavLink activeClassName="active" to="/login">
                    {loginMsg}</NavLink>
            </li>

        </ul>

    )
}


function Home() {

    return (
        <div>
            <h1>Practial Info</h1>
        </div>
    )
}



function NoMatch() {
    let location = useLocation();
    return (
        <div>
            <h3>No match for
                <code>{
                    location.pathname
                }</code>
            </h3>
        </div>
    )
}

export default App;
