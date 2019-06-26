import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';

class Courses extends Component {

    constructor() {
        super();
        this.state = {
			response: [],
        }
    }

    // this function gets a list of courses.
    performSearch = () => {
        axios('http://localhost:5000/api/courses').then(response => {

            // set response to the list of courses.
            this.setState({ response: response });

        // handle errors.
        }).catch(error => {
            console.log('Error fetching and parsing data ', error);
            this.props.history.push('/error');
        });
    }

    // perform search when page loads.
    componentDidMount() {
        this.performSearch();
    }

    render() {

        // list of courses to be displayed.
        let courses;

        // initially set to an empty array when response is initialized
        // it becomes an object and the length turns from 0 to null.
        if (this.state.response.length !== 0) {

            // map each course to courses.
            const results = this.state.response.data
            courses = results.map((course) => 
                <div key={course.course.id} className="grid-33"><Link className="course--module course--link" to={`/courses/${course.course.id}`} >
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.course.title}</h3>
                </Link></div>
            );

            return (
                <div id="root">
                    <div>
                        <Header />
                        <div className="bounds">
                            {courses}
                            <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    viewBox="0 0 13 13" className="add">
                                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                </svg>New Course</h3>
                            </Link></div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    } 
}

export default Courses;