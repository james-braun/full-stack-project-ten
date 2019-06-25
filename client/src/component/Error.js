import React from 'react';
import Header from './Header';

const Error = () => {
    return (
        <div id="root">
            <div>
                <Header />
                <div class="bounds">
                    <h1>Error</h1>
                    <p>Sorry! We just encountered an unexpected error.</p>
                </div>
            </div>
        </div>
    )
}

export default Error;