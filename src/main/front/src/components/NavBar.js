import React from 'react';

import HammerIcon from '../images/HammerIcon'
import {Link} from "react-router-dom"

const NavBar = props => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="navbar-brand">
                <Link className={"noDecoration"} to={"/"}>
                <span className="appIcon">
                    <HammerIcon/>
                </span>
                    <span>Majority Judgment</span>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
