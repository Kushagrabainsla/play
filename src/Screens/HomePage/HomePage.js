import React, {
    useContext,
    useEffect,
    useState,
} from 'react';
import './HomePage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    RiAccountCircleFill,
    RiChatSmile3Fill,
    RiHome5Fill,
} from 'react-icons/ri';
import {
    Modal,
    Skeleton,
    Badge,
} from 'antd';
import { UserContext } from '../../StateManagement/UserContext';
import { NewMessagesContext } from '../../StateManagement/NewMessagesContext';
import MatchedProfileCard from '../../Components/MatchedProfileCard/MatchedProfileCard';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function HomePage() {
    const [currUser] = useContext(UserContext);
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    const [matchedProfiles, setmatchedProfiles] = useState(false);

    async function fetchMatches() {
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/user/connections`;
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
            Modal.warn({ content: 'Error while loading , please refresh !!' });
        });
    }
    async function makeMatches() {
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/makeMatches`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: currUser,
            },
        };
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
                        {
                            [0, 1, 2, 3, 4].map((id) => <Skeleton
                                key={id}
                                active
                                avatar={{ size: 80 }}
                                paragraph={{ rows: 3 }}
                                className='matchedProfileSkeleton'
                            />)
                        }
                    </>
                }
            </div>
            <div className='homeFloatingFooter'>
                <Link
                    to='/chats'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Badge dot={areNewMessagesAvailable}>
                        <RiChatSmile3Fill
                            fontSize={32}
                            color='lightgrey'
                        />
                    </Badge>
                </Link>
                <Link
                    to='/'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiHome5Fill
                        fontSize={32}
                        color='black'
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
