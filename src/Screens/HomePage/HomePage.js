import React, { useContext, useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    RiAccountCircleFill,
    RiChatSmile3Fill,
    RiHome5Fill,
} from 'react-icons/ri';
import { Modal } from 'antd';
import { Context } from '../../Context';
import MatchedProfileCard from '../../Components/MatchedProfileCard/MatchedProfileCard';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function HomePage() {
    const [currUser] = useContext(Context);
    const [matchedProfiles, setmatchedProfiles] = useState([]);

    async function fetchMatches() {
        const url = `${process.env.REACT_APP_SERVER_DEV_URL}/user/connections`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: currUser,
            },
        };
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setmatchedProfiles(response.data.result);
            }
        }).catch(() => {
            // console.log(err);
            Modal.warn({ content: 'Error while loading , please refresh !!' });
        });
    }
    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <div className='homeContainer'>
            <div className='matchedProfilesContainer'>
                {
                    matchedProfiles.map((profile, profileIndex) => <MatchedProfileCard
                        profile={profile}
                        key={profileIndex}
                    />)
                }
            </div>
            <div className='homeFloatingFooter'>
                <Link
                    to='/'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiChatSmile3Fill
                        fontSize={32}
                        color='white'
                    />
                </Link>
                <Link
                    to='/'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiHome5Fill
                        fontSize={32}
                        color='white'
                    />
                </Link>
                <Link
                    to='/profile'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiAccountCircleFill
                        fontSize={32}
                        color='white'
                    />
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
