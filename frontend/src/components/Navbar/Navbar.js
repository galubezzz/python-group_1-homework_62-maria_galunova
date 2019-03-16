import React from 'react';
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Logo/>
        <Menu/>
    </nav>
);

export default Navbar;
