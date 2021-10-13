import React from 'react';
import './RightCompartment.css';
import { Link } from 'react-router-dom';

function RightCompartment() {
    return (
        <div className='layout-right-area'>
            <Link
                to='/privacy-policy'
                style={{
                    textDecoration: 'none',
                    color: 'rgb(83, 100, 113)',
                    fontSize: '13px',
                }}
            >Privacy Policy</Link>
            <Link
                to='/privacy-policy'
                style={{
                    textDecoration: 'none',
                    color: 'rgb(83, 100, 113)',
                    fontSize: '13px',
                }}
            >Cookie Policy</Link>
            <Link
                to='/privacy-policy'
                style={{
                    textDecoration: 'none',
                    color: 'rgb(83, 100, 113)',
                    fontSize: '13px',
                }}
            >Terms of service</Link>
        </div>
    );
}

export default RightCompartment;
