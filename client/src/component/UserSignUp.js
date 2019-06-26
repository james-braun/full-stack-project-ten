import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import { Link } from 'react-router-dom';


class UserSignUp extends Component {

    // create input variables.
    emailAddress = React.createRef();
    password = React.createRef();
    firstName = React.createRef();
    lastName = React.createRef();
    confirmPassword = React.createRef();

    // holds jsx errors.
    errorsjsx;

    // function logsin user.
    userCreated = () => {
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('firstName', this.firstName.value);
        localStorage.setItem('lastName', this.lastName.value);
        localStorage.setItem('email', this.emailAddress.value);
        localStorage.setItem('password', this.password.value);
        this.props.history.push('/');
    }

     createUser = (e) => {
         e.preventDefault();

         // if email is valid...
        var regExpression = /^[^@]+@[^@.]+\.[a-z]+$/i;
         if (regExpression.test(this.emailAddress.value)) {

            // if passwords match...
             if (this.confirmPassword.value === this.password.value) {

                // signin user...
                axios.post('http://localhost:5000/api/users', {
                    firstName: this.firstName.value,
                    lastName: this.lastName.value,
                    emailAddress: this.emailAddress.value,
                    password: this.password.value

                    // login user and catch any errors.
                }).then(() => this.userCreated()).catch((error) => { console.log('Error creating user ' + error); 
                this.errorsjsx = (<div><h2 className="validation--errors--label">Validation errors</h2><div className="validation-errors"><ul><li>User already exists error.</li></ul></div></div>);
                this.forceUpdate();});
            } else {
                this.errorsjsx = (<div><h2 className="validation--errors--label">Validation errors</h2><div className="validation-errors"><ul><li>Passwords don't match.</li></ul></div></div>);
                this.forceUpdate();
            }
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
                            <h1>Sign Up</h1>
                            {this.errorsjsx}
                        <div>
                            <form onSubmit={(e) => this.createUser(e)}>
                                <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" ref={(input) => this.firstName = input} required /></div>
                                <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" ref={(input) => this.lastName = input} required /></div>
                                <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" ref={(input) => this.emailAddress = input} required /></div>
                                <div><input id="password" name="password" type="password" className="" placeholder="Password" ref={(input) => this.password = input} required /></div>
                                    <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" ref={(input) => this.confirmPassword = input} required /></div>
                                <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={(event) => { event.preventDefault(); window.location.href = '/'; }}>Cancel</button></div>
                                </form>
                            </div>
                            <p>&nbsp;</p>
                            <p>Already have a user account? <Link to="/courses/signin">Click here</Link> to sign in!</p>
                        </div>
                    </div>
            </div>
            </div>
        );
    }
}
export default UserSignUp;
