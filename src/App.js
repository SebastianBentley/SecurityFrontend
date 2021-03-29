import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import DoLogin from "./pages/Login.js"
import Home from "./pages/Home.js"
import NoMatch from "./components/NoMatch.js"
import Header from "./components/NavBar.js"

import {
    Switch,
    Route,
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

export default App;
