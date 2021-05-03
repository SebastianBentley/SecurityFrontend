import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Sebsen from "../images/sebsen.svg";


export default function Header({ isLoggedIn, loginMsg }) {
    return (
        <ul className="header">
            <li>
                <img className="logo" src={Sebsen} alt=""></img>
            </li>
            
            <li>
                <NavLink exact activeClassName="active" to="/"><HomeIcon className="navIcon"/>Home</NavLink>
            </li>

            <li>
                <NavLink activeClassName="active" to="/categories"><ListIcon className="navIcon"/>Categories</NavLink>
            </li>

            <li>
                <NavLink activeClassName="active" to="/login"><VpnKeyIcon className="navIcon"/>  {loginMsg}</NavLink>
            </li>
        </ul>

    )
}


