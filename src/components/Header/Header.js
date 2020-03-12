import React from 'react';
import logo from "../../images/logo.png";
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="" />
            <ul>
                <li>
                    <a href="/shop">shop</a>

                </li>
                <li>
                    <a href="/order">Order Review</a>

                </li>
                <li>
                    <a href="/manage">Manage Inventory</a>

                </li>
            </ul>

        </div>
    );
};

export default Header;