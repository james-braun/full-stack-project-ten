import React from 'react';
import Header from './Header';

const Forbidden = () => {

    return (
            <div id="root">
                <div>
                    <Header />
                        <div className="bounds">
                            <h1>Forbidden</h1>
                            <p>Oh oh! You can't access this page.</p>
                        </div>
                </div>
            </div>
            );
}

export default Forbidden;