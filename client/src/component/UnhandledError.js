import React from 'react';
import Header from './Header';

const UnHandledError = () => {
    return (
        <div id="root">
            <div>
                <Header />
                <div className="bounds">
                    <h1>Error</h1>
                    <p>Sorry! We just encountered an unexpected error.</p>
                </div>
            </div>
        </div>
    );
}

export default UnHandledError;