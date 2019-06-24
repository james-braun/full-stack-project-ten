import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
class UserSignUp extends Component {

    emailAddress = React.createRef();
    password = React.createRef();
    firstName = React.createRef();
    lastName = React.createRef();
    confirmPassword = React.createRef();
    
    createUser = (e) => {
        e.preventDefault();
        var that = this;
        axios.post('http://localhost:5000/api/users', {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            emailAddress: this.emailAddress.value,
            password: this.password.value
        }).then(
            localStorage.setItem('authenticated', 'true'),
            localStorage.setItem('firstName', that.firstName.value),
            localStorage.setItem('lastName', that.lastName.value),
            localStorage.setItem('email', that.emailAddress.value),
            localStorage.setItem('password', that.password.value),
            that.props.history.push('/')
        ).catch((error) => { console.log('Error creating user ' + error) });
    }

render() {
    return (
        <div id="root">
            <div>
                <Header />
                    <div className="bounds">
                        <div className="grid-33 centered signin">
                            <h1>Sign Up</h1>
                        <div>
                            <form onSubmit={(e) => this.createUser(e)}>
                                    <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" ref={(input) => this.firstName = input} /></div>
                                    <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" ref={(input) => this.lastName = input} /></div>
                                    <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" ref={(input) => this.emailAddress = input} /></div>
                                    <div><input id="password" name="password" type="password" className="" placeholder="Password" ref={(input) => this.password = input} /></div>
                                    <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" ref={(input) => this.confirmPassword = input} /></div>
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
