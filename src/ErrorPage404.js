import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage404 = (props) => {
    return (
        <div className="App-header">
            <h1>Page Not Found</h1>
            <p className="alert-danger">
                The page you are tring to access is not found on this server! <br /> <Link to='/'>Visit MyReads Page</Link>
            </p>
        </div>
    )
}

export default ErrorPage404;