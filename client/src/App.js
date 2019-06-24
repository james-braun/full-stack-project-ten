import React, { Component } from 'react';

//import axios from 'axios';
import './App.css';
import Courses from './component/Courses';
import UserSignIn from './component/UserSignIn'
import CourseDetail from './component/CourseDetail';
import UserSignUp from './component/UserSignUp';
import UserSignOut from './component/UserSignOut';
import CreateCourse from './component/CreateCourse'
import UpdateCourse from './component/UpdateCourse';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => {
                if (localStorage.getItem('authenticated') === 'true') {
                    return <Component {...props} />
                } else {
                    localStorage.setItem('path', props.location.pathname);
                    return <Redirect to={"/courses/signin"} />
                }
            }}
        />
    );
}

class App extends Component {
    authenticate = (email, password, props) => {
        if (localStorage.getItem('authenticated') !== 'true') {
            localStorage.setItem('authenticated', 'false');
        }
        if (localStorage.getItem('authenticated') === 'false') {
            axios('http://localhost:5000/api/users', { auth: { username: email, password: password } })
                .then(function (response) {
                    localStorage.setItem('authenticated', 'true');
                    localStorage.setItem('firstName', response.data.user[0].firstName);
                    localStorage.setItem('lastName', response.data.user[0].lastName);
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                    props.props.history.push(localStorage.getItem('path'));
                }).catch(error => { console.log('Error on Authentication ', error); });
        } 
    }

    render() {
            
            return (
                <Router>
                    <Switch>
                        <Route path='/' exact component={Courses} />
                        <Route path='/courses/signin' render={(props) => <UserSignIn authenticate={this.authenticate} props={props} />} />
                        <Route path='/courses/signup' component={UserSignUp} />
                        <Route path='/courses/signout' component={UserSignOut} />
                        <PrivateRoute path='/courses/create' component={CreateCourse} />
                        <PrivateRoute path='/courses/:id' exact component={CourseDetail} />
                        <PrivateRoute path='/courses/:id/update' component={UpdateCourse} />
                    </Switch>
                </Router>
            );
    }
}

export default App;
