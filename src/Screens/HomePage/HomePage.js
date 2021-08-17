import React, {
    useContext,
    useEffect,
    useState,
} from 'react';
import './HomePage.css';
import axios from 'axios';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { Link } from 'react-router-dom';
import {
    RiAccountCircleFill,
    RiChatSmile3Fill,
    RiHome5Fill,
} from 'react-icons/ri';
import {
    Modal,
    Skeleton,
} from 'antd';
import { Context } from '../../StateManagement/Context';
import MatchedProfileCard from '../../Components/MatchedProfileCard/MatchedProfileCard';

// const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;
const AUTH_TOKEN = 'Bearer blruvyq362f3t9746rbvt578tbcr367b48br34t786fg47985nt27v54';

function HomePage() {
    const [currUser] = useContext(Context);
    const [matchedProfiles, setmatchedProfiles] = useState(false);

    async function fetchMatches() {
        // const url = `${process.env.REACT_APP_SERVER_DEV_URL}/user/connections`;
        const url = 'https://play-backend-app.herokuapp.com/user/connections';
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
    async function makeMatches() {
        // const url = `${process.env.REACT_APP_SERVER_DEV_URL}/makeMatches`;
        const url = 'https://play-backend-app.herokuapp.com/makeMatches';
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: currUser,
            },
        };
        // Add a feature ( PULL TO REFRESH )
        // so that it does not call the backend on every home screen opened.
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                fetchMatches();
            }
        });
    }
    useEffect(() => {
        makeMatches();
    }, []);

    return (
        <div className='homeContainer'>
            <PullToRefresh onRefresh={makeMatches}>
                <div className='matchedProfilesContainer'>
                    {
                        // eslint-disable-next-line no-nested-ternary
                        matchedProfiles
                        ? matchedProfiles.length > 0
                            ? matchedProfiles.map((profile, profileIndex) => <MatchedProfileCard
                                profile={profile}
                                key={profileIndex}
                            />)
                            : <img
                                src='https://raw.githubusercontent.com/Kushagrabainsla/play/master/public/noMatchesFound.svg'
                                alt='No Matches Found'
                                style={{
                                    height: '60vh',
                                    paddingTop: '30vh',
                                }}
                            />
                        : <>
                            <Skeleton
                                active
                                className='matchedProfileBottom'
                            />
                            <Skeleton
                                active
                                className='matchedProfileBottom'
                            />
                            <Skeleton
                                active
                                className='matchedProfileBottom'
                            />
                            <Skeleton
                                active
                                className='matchedProfileBottom'
                            />
                            <Skeleton
                                active
                                className='matchedProfileBottom'
                            />
                        </>
                    }
                </div>
            </PullToRefresh>
            <div className='homeFloatingFooter'>
                <Link
                    to='/chats'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiChatSmile3Fill
                        fontSize={32}
                        color='lightgrey'
                    />
                </Link>
                <Link
                    to='/'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiHome5Fill
                        fontSize={35}
                        color='white'
                    />
                </Link>
                <Link
                    to='/profile'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiAccountCircleFill
                        fontSize={32}
                        color='lightgrey'
                    />
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
