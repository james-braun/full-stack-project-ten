import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Header from './Header';

class CourseDetail extends Component {

    constructor() {
        super();
        this.state = {
            response: [],
        }
    }
    performSearch = () => {
        var httpVariable = `http://localhost:5000/api/courses/${this.props.match.params.id}`;
        axios(httpVariable).then(response => {
            this.setState({ response: response });
        }).catch(error => { console.log('Error fetching and parsing data ', error); });
    }

    componentDidMount() {
        this.performSearch();
    }

    render() {
        if (this.state.response.length !== 0) {
            return (
                <div id="root">
                    <div>
                        <Header />
                        <div>
                            <div className="actions--bar">
                                <div className="bounds">
                                    <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="index.html">Delete Course</a></span><a
                                        className="button button-secondary" href="index.html">Return to List</a></div>
                                </div>
                            </div>
                            <div className="bounds course--detail">
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <h3 className="course--title">{this.state.response.data.course.title}</h3>
                                        <p>By {this.state.response.data.user.firstName} {this.state.response.data.user.lastName}</p>
                                    </div>
                                    <div className="course--description">
                                        <ReactMarkdown source={this.state.response.data.course.description} />
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <h3>{this.state.response.data.course.estimatedTime}</h3>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <ul>
                                                    <ReactMarkdown source={this.state.response.data.course.materialsNeeded} />
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
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
export default CourseDetail;