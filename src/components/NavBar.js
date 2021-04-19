import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from 'react-bootstrap/Dropdown'

export default function Header({ isLoggedIn, loginMsg }) {
    return (
        <ul className="header">
            <li>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
            </li>

            <li>
                <NavLink activeClassName="active" to="/categories">Categories</NavLink>
            </li>

            <li>
                <NavLink activeClassName="active" to="/login">
                    {loginMsg}</NavLink>
            </li>
        </ul>

    )
}


