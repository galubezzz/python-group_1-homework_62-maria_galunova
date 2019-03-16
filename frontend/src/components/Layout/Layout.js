import React, {Fragment} from 'react';
import Navbar from "../Navbar/Navbar";

const Layout = props => (
    <Fragment>
        <header>
            <Navbar />
        </header>
        <main className="container">
            {props.children}
        </main>
    </Fragment>
);

export default Layout;
