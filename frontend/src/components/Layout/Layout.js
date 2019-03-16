import React, {Fragment} from 'react';

const Layout = props => (
    <Fragment>
        <header>Header will be here</header>
        <main className="container">
            {props.children}
        </main>
    </Fragment>
);

export default Layout;
