import React, { Component } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
class UserSignIn extends Component {

    emailAddress = React.createRef();
    password = React.createRef();

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.authenticate(this.emailAddress.value, this.password.value, this.props);
        if (!localStorage.getItem('path')) {
            localStorage.setItem('path', '/');
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