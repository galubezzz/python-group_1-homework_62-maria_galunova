import React, {Fragment} from 'react';
import MenuItem from "./MenuItem/MenuItem"


const Menu = () => (
    <Fragment>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <MenuItem to="/" label="Фильмы"/>
                <MenuItem to="/movies/add" label="Добавить фильм"/>
                <MenuItem to="/halls/" label="Залы"/>
                <MenuItem to="/halls/add" label="Добавить зал"/>
                {localStorage.getItem('auth-token') ?
                    <MenuItem to="/logout">Выйти</MenuItem> :
                    <MenuItem to="/login">Войти</MenuItem>}

            </ul>
        </div>
    </Fragment>
);


export default Menu;
