import React from 'react';

import HammerIcon from './images/HammerIcon'

const NavBar = props => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="navbar-brand">
                <span className="appIcon">
                    <HammerIcon/>
                </span>
                <span>Majority Judgment</span>
            </div>
        </nav>
    );
}

export default NavBar;
