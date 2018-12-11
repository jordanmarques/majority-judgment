import React from 'react';
import {Link} from "react-router-dom"
import "../logo-animation.css"

const NavBar = () => {

    const renderName = (name) => {
        return name.trim().split("").map(char => <span>{char}</span>)
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="navbar-brand">
                <Link className={"noDecoration"} to={"/"}>
                    <span className="animation anim-text-flow">
                        {renderName("Θέμις - MAJORITY JUDGMENT")}
                    </span>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
