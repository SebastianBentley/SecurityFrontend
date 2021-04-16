import loginFacade from "../api/userFacade.js"
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha"
import CreateModal from "../components/RegisterUser"


function DoLogin({ loggedIn, setLoggedIn, goHome }) {

    const [errorMsg, setErrorMsg] = useState('');

    const logout = () => {
        loginFacade.logout()
        setLoggedIn(false)
        setErrorMsg('')
        goHome();
    }

    const login = (user, pass) => {
        loginFacade.login(user, pass).then(res => setLoggedIn(true)).catch(err => {
            if (err.status) {
                err.fullError.then(e => setErrorMsg(e.message));
            }
        });
        goHome();
    }


    return (
        <div> {
            !loggedIn ? (
                <div><LogIn login={login} /><p>{errorMsg}</p>
                </div>
            ) : (
                <div>
                    <LoggedIn />
                    <button onClick={logout}>Logout</button>
                </div>
            )
        } </div>
    )
}

function LogIn({ login }) {
    const init = {
        username: "",
        password: ""
    };

    const [loginCredentials, setLoginCredentials] = useState(init);
    const [cptcnfrm, setCptcnfrm] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState("");
    const performLogin = (evt) => {
        evt.preventDefault();
        if (cptcnfrm) { 
            login(loginCredentials.username, loginCredentials.password);
        } else {
            setLoginErrorMsg("hehe prøv igen :0)")
        }
    }

    const onChange = (evt) => {
        setLoginCredentials({
            ...loginCredentials,
            [evt.target.id]: evt.target.value
        })
    }

    const confirmCaptcha = () => {
        setCptcnfrm(true);
    }
    const recaptchaRef = React.createRef();
    const onSubmit = () => {
        const recaptchaValue = recaptchaRef.current.getValue();
        this.props.onSubmit(recaptchaValue);
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit} onChange={onChange}>
                <input placeholder="User Name" id="username" />
                <input placeholder="Password" id="password" />
                <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6Ld77oUaAAAAADoXeVdhtPWc6WlwkbxKSWsm2T8Q"
                        onChange={confirmCaptcha}
                    />
                <button onClick={performLogin}>Login</button>
                   
                </form>
                <CreateModal/>
                {loginErrorMsg} 
        </div>
    )

}
function LoggedIn() {
    const [dataFromServer, setDataFromServer] = useState("Loading...")

    useEffect(() => {
        loginFacade.fetchData().then(data => setDataFromServer(data.msg));
    }, [])

    return (
        <div>
            <h2>Data Received from server</h2>
            <h3>{dataFromServer}</h3>
        </div>
    )

}

export default DoLogin;