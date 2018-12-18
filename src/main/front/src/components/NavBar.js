import React from 'react';
import {Link} from "react-router-dom"
import "../logo-animation.css"
import ColoredText from "./ColoredText";

const NavBar = () => {

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="navbar-brand">
                <Link className={"noDecoration"} to={"/"}>
                    <ColoredText text={"Θέμις - MAJORITY JUDGMENT"}/>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
