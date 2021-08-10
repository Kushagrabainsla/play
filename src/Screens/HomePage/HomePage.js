import React, { useContext, useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { RiAccountCircleFill, RiChatSmile3Fill } from 'react-icons/ri';
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
        }).catch((err) => {
            console.log(err);
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
                <Link to='/profile'>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<RiChatSmile3Fill />}
                        className='navbarButton'
                    >
                        Chats
                    </Button>
                </Link>
                <Link to='/profile'>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<RiAccountCircleFill />}
                        className='navbarButton'
                    >
                        Profile
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
