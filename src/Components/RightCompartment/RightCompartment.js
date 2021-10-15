import React from 'react';
import './RightCompartment.css';
import { Link } from 'react-router-dom';

function RightCompartment() {
    return (
        <div className='layout-right-area'>
            <Link
                to='/privacy-policy'
                className='layout-right-text'
            >
                Privacy Policy
            </Link>
            <Link
                to='/privacy-policy'
                className='layout-right-text'
            >
                Cookie Policy
            </Link>
            <Link
                to='/privacy-policy'
                className='layout-right-text'
            >
                Terms of service
            </Link>
            <p
            className='layout-right-text'
            >
                © 2021 Play, Inc.
            </p>
        </div>
    );
}

export default RightCompartment;
