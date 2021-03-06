import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';

class UpdateCourse extends Component {

    constructor() {
        super();
        this.state = {
            response: [],
        }
    }

    // create input variables.
    estimatedTime = React.createRef();
    title = React.createRef();
    description = React.createRef();
    materialsNeeded = React.createRef();

    // holds error jsx.
    errorsjsx;

    // get course to be updated.
    performSearch = () => {
        var httpVariable = `http://localhost:5000/api/courses/${this.props.match.params.id}`;
        axios(httpVariable).then(response => {
            this.setState({ response: response });

        // Handle errors.
        }).catch(error => {
            console.log('Error fetching and parsing data ', error);
            console.log(error.status);
            if (error.response) {
                (error.response.status === 500) ? this.props.history.push('/notfound') : this.props.history.push('/error');
            } else {
                this.props.history.push('/error');
            }
        });
    }

    // this function updates the course. 
    updateCourse = (e) => {
        e.preventDefault();

        // if the user email matches the course owners email...
        if (this.state.response.data.user.emailAddress === localStorage.getItem('email')) {

            // and the title and descrition are valid.
            if (this.title.value !== '' && this.description.value !== '') {

                // update the course.
                axios.put(`http://localhost:5000/api/courses/${this.props.match.params.id}`, { description: this.description.value, materialsNeeded: this.materialsNeeded.value, title: this.title.value, estimatedTime: this.estimatedTime.value },
                    { auth: { username: localStorage.getItem('email'), password: localStorage.getItem('password') } })

                    // then redirect to path or handle errors.
                    .then(() => this.props.history.push(localStorage.getItem('path'))).catch(error => { (error.status === 500) ? this.props.history.push('/error') : this.props.history.push('/notfound'); });
            } else {
                this.errorsjsx = (<div><h2 className="validation--errors--label">Validation errors</h2><div className="validation-errors"><ul>Title and description must have a value.</ul></div></div>);
                this.forceUpdate();
            }
        } else {
            this.errorsjsx = (<div><h2 className="validation--errors--label">Validation errors</h2><div className="validation-errors"><ul>User does not have permission to edit this course.</ul></div></div>);
            this.forceUpdate();
        }
    }

    // perform search on page load.
    componentDidMount() {
        this.performSearch();
    }

    render() {
        // initially set to an empty array when response is initialized
        // it becomes an object and the length turns from 0 to null.
        if (this.state.response.length !== 0) {

            // deny access to users that don't own the course.
            if (this.state.response.data.user.emailAddress !== localStorage.getItem('email')) {
                this.props.history.push('/forbidden');
            }
            return (
                <div id="root">
                    <div>
                        <Header />
                        <div className="bounds course--detail">
                            <h1>Update Course</h1>
                            <div>
                                {this.errorsjsx}
                                <form onSubmit={this.updateCourse}>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." ref={(input) => this.title = input} defaultValue={this.state.response.data.course.title} /></div>
                                            <p>By {this.state.response.data.user.firstName} {this.state.response.data.user.lastName}</p>
                                            </div>
                                            <div className="course--description">
                                            <div><textarea id="description" name="description" className="" placeholder="Course description..." ref={(input) => this.description = input} defaultValue={this.state.response.data.course.description}></textarea></div>
                                            </div>
                                        </div>
                                        <div className="grid-25 grid-right">
                                            <div className="course--stats">
                                                <ul className="course--stats--list">
                                                    <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" ref={(input) => this.estimatedTime = input} defaultValue={this.state.response.data.course.estimatedTime} /></div>
                                                    </li>
                                                    <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." ref={(input) => this.materialsNeeded = input} defaultValue={this.state.response.data.course.materialsNeeded}></textarea></div>
                                                    </li>
                                                </ul>
                                                </div>
                                        </div>
                                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={(event) => { event.preventDefault(); window.location.href = `/courses/${this.props.match.params.id}`; }}>Cancel</button></div>
                                </form>
                                    </div>
                                </div>
                            </div>
                        </div>
            );
        } else {
            return null;
        }
    }
}

export default UpdateCourse;