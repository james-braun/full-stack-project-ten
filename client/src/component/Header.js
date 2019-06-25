import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    if (!(localStorage.getItem('authenticated') === 'true')) {
        return (
            <div>
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav><Link className="signup" to="/signup">Sign Up</Link><Link className="signin" to="/signin">Sign In</Link></nav>
                </div>
            </div>
                <hr />
                </div>
            );
    } else {
        return (
            <div>
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo">Courses</h1>
                    <nav><span>Welcome {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}!</span><Link className="signout" to="/signout">Sign Out</Link></nav>
                </div>
            </div>
            <hr />
            </div>
        );
    }

}
export default Header;