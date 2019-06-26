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
    estimatedTime = React.createRef();
    title = React.createRef();
    description = React.createRef();
    materialsNeeded = React.createRef();
    errorsjsx;

    performSearch = () => {
        var httpVariable = `http://localhost:5000/api/courses/${this.props.match.params.id}`;
        axios(httpVariable).then(response => {
            this.setState({ response: response });
        }).catch(error => {
            console.log('Error fetching and parsing data ', error);
            this.props.history.push('/notfound');
        });
    }

    updateCourse = (e) => {
        e.preventDefault();
        if (this.state.response.data.user.emailAddress === localStorage.getItem('email')) {
            if (this.title.value !== '' && this.description.value !== '') {
                axios.put(`http://localhost:5000/api/courses/${this.props.match.params.id}`, { description: this.description.value, materialsNeeded: this.materialsNeeded.value, title: this.title.value, estimatedTime: this.estimatedTime.value },
                    { auth: { username: localStorage.getItem('email'), password: localStorage.getItem('password') } })
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

    componentDidMount() {
        this.performSearch();
    }

    render() {
        if (this.state.response.length !== 0) {
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