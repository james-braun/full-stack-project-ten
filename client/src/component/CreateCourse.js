import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';

class CreateCourse extends Component {
    constructor() {
        super();
        this.state = {
            description: '',
            materialsNeeded: ''
        }
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaterialsNeededChange = this.handleMaterialsNeededChange.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }

    // creates a value for description.
    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    // creates a value for materials needeed.
    handleMaterialsNeededChange(event) {
        this.setState({ materialsNeeded: event.target.value });
    }

    // creates a value for title.
    title = React.createRef();

    // creates a value for estimated time.
    estimatedTime = React.createRef();

    // hold jsx for error validation.
    errorsjsx;

    // this method creates a course.
    createCourse = (e) => {

        e.preventDefault();

        // holds jsx for error validation.
        this.errorsjsx = [];
        var errors = [];

        // if title error add title error validation.
        if (this.title.value === '') {
            errors.push(<li key='1'>Please provide a value for "title"</li>);
        }

        // if descrition error add error validation.
        if (this.state.description === '') {
            errors.push(<li key='2'>please provide a value for "Description"</li>);
        }

        // post errors.
        if (errors.length > 0) {
            this.errorsjsx = (<div><h2 className="validation--errors--label">Validation errors</h2><div className="validation-errors"><ul>{errors}</ul></div></div>);
            this.forceUpdate();
        }

        // if no errors.
        if (errors.length < 1) {

            // clear all former errors.
            this.forceUpdate();

            // if user is authenticated...
            if ((localStorage.getItem('authenticated') === 'true')) {

                // create user.
                axios.post('http://localhost:5000/api/courses', {
                    title: this.title.value,
                    description: this.state.description,
                    materialsNeeded: this.state.materialsNeeded,
                    estimatedTime: this.estimatedTime.value
                }, { auth: { username: localStorage.getItem('email'), password: localStorage.getItem('password') } })

                    // return to home screen.
                    .then(() => this.props.history.push('/'))

                    // deal with errors.
                    .catch(error => {
                        console.log('there has been a course creation error ' + error);
                        if (error.response) {
                            (error.response.status === 500) ? this.props.history.push('/notfound') : this.errorsjsx = (<div><h2 className="validation--errors--label">Validation errors</h2><div className="validation-errors"><ul>Course creation error.</ul></div></div>);
                            this.forceUpdate();
                        } else {
                            this.props.history.push('/error');
                        }
                       
                    });
            }

        }
    }

render() {
    return (
        <div id="root">
            <div>
                <Header />
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                        {this.errorsjsx}
                        <form onSubmit={(e) => this.createCourse(e)}>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." ref={(input) => this.title = input} /></div>
                                    <p>By Joe Smith</p>
                                </div>
                                <div className="course--description">
                                    <div><textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description} onChange={this.handleDescriptionChange}></textarea></div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" ref={(input) => this.estimatedTime = input} /></div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.handleMaterialsNeededChange}></textarea></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={(event) => { event.preventDefault(); window.location.href = '/'; }}>Cancel</button></div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCourse;