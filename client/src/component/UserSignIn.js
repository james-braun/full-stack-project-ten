import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
class UserSignIn extends Component {

    // create input variables.
    emailAddress = React.createRef();
    password = React.createRef();

    // holds error jsx.
    errorsjsx;

    // Function handles form submition.
    handleSubmit = (e) => {
        e.preventDefault();

        // if email is a valid email.
        var regExpression = /^[^@]+@[^@.]+\.[a-z]+$/i;
        if (regExpression.test(this.emailAddress.value)) {

            // make a copy of 'this'
            var that = this;

            // is "authenticated" is undefined make it false.
            if (localStorage.getItem('authenticated') !== 'true') {
                localStorage.setItem('authenticated', 'false');
            }

            // if not authenticated signin user.
            if (localStorage.getItem('authenticated') === 'false') {
                axios('http://localhost:5000/api/users', { auth: { username: this.emailAddress.value, password: this.password.value } })
                    .then(function (response) {
                        localStorage.setItem('authenticated', 'true');
                        localStorage.setItem('firstName', response.data.user[0].firstName);
                        localStorage.setItem('lastName', response.data.user[0].lastName);
                        localStorage.setItem('email', that.emailAddress.value);
                        localStorage.setItem('password', that.password.value);
                        that.props.props.history.push(localStorage.getItem('path'));

                    // handle errors.
                    }).catch(error => {
                        this.errorsjsx = (<div><h2 className="validation--errors--label">Validation errors</h2><div className="validation-errors"><ul><li>Error user does not exist or wrong password.</li></ul></div></div>);
                        this.forceUpdate();
                        console.log('Error on Authentication ', error);
                    });
            }
            if (!localStorage.getItem('path')) {
                localStorage.setItem('path', '/');
            }

        // if email is invalid print error.
        } else {
            this.errorsjsx = (<div><h2 className="validation--errors--label">Validation errors</h2><div className="validation-errors"><ul><li>Please provide a valid email.</li></ul></div></div>);
            this.forceUpdate();
        }
    }
    render() {
        return (
            <div id="root">
                <div>
                    <Header />
                    <div className="bounds">
                        <div className="grid-33 centered signin">
                            <h1>Sign In</h1>
                            <div>
                                {this.errorsjsx}
                                <form onSubmit={this.handleSubmit}>
                                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" ref={(input) => this.emailAddress = input} required /></div>
                                    <div><input id="password" name="password" type="password" className="" placeholder="Password" ref={(input) => this.password = input} required /></div>
                                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={() => this.props.props.history.push('/')}>Cancel</button></div>
                                </form>
                                </div>
                                    <p>&nbsp;</p>
                                    <p>Don't have a user account? <Link to="/courses/signup">Click here</Link> to sign up!</p>
                                </div>
                            </div>
                        </div>
                    </div> 
        
            );
    }
}

export default UserSignIn;