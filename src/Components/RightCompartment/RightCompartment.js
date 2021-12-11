import React from 'react';
import './RightCompartment.css';
import {
    RiGithubFill,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

function RightCompartment() {
    return (
        <div className='layout-right-area'>
            <div className='layout-right-advertisement-container'>
                <div className='layout-right-advertisement-header'>
                    AD
                </div>
                <div className='layout-right-advertisement-content'>
                    Help your brand reach your desired
                    audience with the help of our tech.
                </div>
                <div className='layout-right-advertisement-content'>
                    Place your Ad here.
                </div>
            </div>
            <div
                className='layout-right-github-container'
                onClick={() => window.open('https://github.com/Kushagrabainsla/play')}
            >
                Star me on github
                <RiGithubFill style={{ marginLeft: 5 }}/>
            </div>
            <div className='layout-right-legals-container'>
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
        </div>
    );
}

export default RightCompartment;
