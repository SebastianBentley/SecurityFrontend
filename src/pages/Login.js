import loginFacade from "../api/userFacade.js";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import CreateModal from "../components/RegisterUser";
import Profile from "../pages/Profile";

function DoLogin({ loggedIn, setLoggedIn, goHome }) {
  const [errorMsg, setErrorMsg] = useState("");

  const logout = () => {
    loginFacade.logout();
    setLoggedIn(false);
    setErrorMsg("");
    goHome();
  };

  const login = (user, pass) => {
    loginFacade
      .login(user, pass)
      .then((res) => setLoggedIn(true))
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMsg(e.message));
        }
      });
    goHome();
  };

  return (
    <div>
      {" "}
      {!loggedIn ? (
        <div>
          <LogIn login={login} />
          <p>{errorMsg}</p>
        </div>
      ) : (
        <div>
          <LoggedIn loggedIn={loggedIn} />
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 text-center">
              <button className="mt-5 btn btn-primary" onClick={logout}>Logout</button>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}

function LogIn({ login }) {
  const init = {
    username: "",
    password: "",
  };

  const [loginCredentials, setLoginCredentials] = useState(init);
  const [cptcnfrm, setCptcnfrm] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const performLogin = (evt) => {
    evt.preventDefault();
    if (cptcnfrm) {
      login(loginCredentials.username, loginCredentials.password);
    } else {
      setLoginErrorMsg("hehe prøv igen >:0)");
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const confirmCaptcha = () => {
    setCptcnfrm(true);
  };
  const recaptchaRef = React.createRef();
  const onSubmit = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    this.props.onSubmit(recaptchaValue);
  };

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="text-center mb-2 mt-5">Login</h2>
          <form onSubmit={onSubmit} onChange={onChange}>
            <input placeholder="User Name" id="username" />
            <br />
            <input className="mt-2" placeholder="Password" id="password" type="password" />
            <br />
            <div className="newcaptcha">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Ld77oUaAAAAADoXeVdhtPWc6WlwkbxKSWsm2T8Q"
                onChange={confirmCaptcha}
              />
            </div>
            <button className="btn btn-primary" onClick={performLogin}>
              Login
            </button>
          </form>
          <CreateModal />
          {loginErrorMsg}
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
function LoggedIn({ loggedIn }) {
  return (
    <div>
      <Profile loggedIn={loggedIn} />
    </div>
  );
}

export default DoLogin;
