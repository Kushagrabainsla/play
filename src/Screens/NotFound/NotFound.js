import React from 'react';
import './NotFound.css';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='notFoundContainer'>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to='/'>Go back to Login</Link>}
            />
        </div>
    );
}

export default NotFound;
