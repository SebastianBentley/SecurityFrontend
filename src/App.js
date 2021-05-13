import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import DoLogin from "./pages/Login.js";
import Home from "./pages/Home.js";
import Category from "./pages/Category.js";
import NoMatch from "./components/NoMatch.js";
import Header from "./components/NavBar.js";
import { Switch, Route, useHistory } from "react-router-dom";
require('dotenv').config()


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  let history = useHistory();
  const goHome = () => {
    history.push("/");
  };
  return (
    <div className="background">
      <Header
        loginMsg={isLoggedIn ? "Profile" : "Login"}
        isLoggedIn={isLoggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home loggedIn={isLoggedIn} />
        </Route>

        <Route exact path="/categories">
          <Category loggedIn={isLoggedIn} />
        </Route>

        <Route exact path="/login">
          <DoLogin
            loggedIn={isLoggedIn}
            setLoggedIn={setLoggedIn}
            goHome={goHome}
          />
        </Route>

        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
