import React from 'react';
import Header from './Header';

const NotFound = () => {

    return (

        <div id="root">
            <div>
                <Header />
                <div className="bounds">
                    <h1>Not Found</h1>
                    <p>Sorry! We couldn't find the page you're looking for.</p>
                </div>
            </div>
        </div>

    );
}
export default NotFound;