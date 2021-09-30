/* eslint-disable max-len */
import React from 'react';
import './WelcomePage.css';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';

function WelcomePage() {
    return (
        <div className='welcome-page'>
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
                <h2>It doesn’t matter if you want to find love, a date, or just have a casual chat, you still want to find an app that’s the right match for you. And it’s not always black and white — when you want to meet new people, your friends at Play can help you out with features designed to make the impossible possible. Dating online just got easier.</h2>
                <br/>
                <h2>It’s easy to chat up a match when you know you have something in common. The Play app lets you connect with people who share your interests.</h2>
                <br/>
                <h2>We won’t brag about being the best free site — we’ll let you decide for yourself by giving you Play at a glance.</h2>
                <Divider />
            </div>
        </div>
    );
}

export default WelcomePage;
