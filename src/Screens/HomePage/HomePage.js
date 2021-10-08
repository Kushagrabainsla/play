import React, {
    useContext,
    useEffect,
    useState,
} from 'react';
import './HomePage.css';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Modal, Skeleton } from 'antd';
import { UserContext } from '../../StateManagement/UserContext';
import { HomeFloatingFooter } from '../../Components/Footers/Footers';
import MatchedProfileCard from '../../Components/MatchedProfileCard/MatchedProfileCard';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function HomePage() {
    const [currUser] = useContext(UserContext);
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
            Modal.warn({ content: 'Please check your network connection.' });
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
            <Helmet>
                <title>Home / Play</title>
            </Helmet>
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
                            src={`${process.env.PUBLIC_URL}/noMatchesFound.svg`}
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
            <HomeFloatingFooter/>
        </div>
    );
}

export default HomePage;
