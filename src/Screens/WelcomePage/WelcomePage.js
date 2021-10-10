/* eslint-disable max-len */
import React from 'react';
import './WelcomePage.css';
import { Divider } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function WelcomePage() {
    return (
        <div className='welcome-page'>
            <Helmet>
                <title>About / Play</title>
            </Helmet>
            <div className='welcome-page-container'>
                <div className='welcome-text-container'>
                    <div className='welcome-text-bold'>play</div>
                    <div className='welcome-text-light'>The social you wanted.</div>
                    <Link to='/'>
                        <div className='welcome-get-started-button'>
                            GET STARTED
                        </div>
                    </Link>
                </div>
            </div>
            <div className='welcome-page-about'>
                <h1>About</h1>
                <Divider />
                <h3>It doesn’t matter if you want to find love, a date, or just have a casual chat, you still want to find an app that’s the right match for you. And it’s not always black and white — when you want to meet new people, your friends at Play can help you out with features designed to make the impossible possible. Dating online just got easier.</h3>
                <br/>
                <h3>It’s easy to chat up a match when you know you have something in common. The Play app lets you connect with people who share your interests.</h3>
                <br/>
                <h3>We won’t brag about being the best free site — we’ll let you decide for yourself by giving you Play at a glance.</h3>
                <Divider />
                <div className='welcome-additionals-container'>
                    <Link to='/privacy-policy'>
                        <div className='additionals-text'>Privary Policy</div>
                    </Link>
                    {/* <Link to='/frequently-asked-questions'>
                        <div className='additionals-text'>FAQ</div>
                    </Link> */}
                    <Link to='/privacy-policy'>
                        <div className='additionals-text'>{'Terms & Conditions'}</div>
                    </Link>
                </div>
            </div>
            {/* <Divider/> */}
        </div>
    );
}

export default WelcomePage;
