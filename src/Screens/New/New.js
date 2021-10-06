import React, {
    useContext,
    useEffect,
    useState,
    // useCallback,
    useRef,
} from 'react';
import './New.css';
import axios from 'axios';
import { UserContext } from '../../StateManagement/UserContext';
import { HomeFloatingFooter } from '../../Components/Footers/Footers';
import MatchedProfileCard from '../../Components/MatchedProfileCard/MatchedProfileCard';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function New() {
    const matchContainer = useRef();
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

    // const [y, setY] = useState(matchContainer.current);

    // const handleNavigation = useCallback((e) => {
    //     matchContainer.current = e.currentTarget;
    //     if (y > matchContainer.current.scrollY) {
    //         document.getElementsByClassName('homeFloatingFooter')[0].style.bottom = '10px';
    //     } else if (y < matchContainer.current.scrollY) {
    //         document.getElementsByClassName('homeFloatingFooter')[0].style.bottom = '-50px';
    //     }
    //     setY(matchContainer.current.scrollY);
    // }, [y]);

    // useEffect(() => {
    //     setY(matchContainer.current.scrollY);
    //     if (matchContainer && matchContainer.current) {
    //         matchContainer.current.addEventListener('scroll', handleNavigation);
    //         return () => {
    //             matchContainer.current.removeEventListener('scroll', handleNavigation);
    //         };
    //     }
    //     return () => {
    //         console.log('matchContainer not available');
    //     };
    // }, [handleNavigation]);

    return (
        <div className='new-container'>
            <div className='new-compartment' ref={matchContainer}>
                {
                    matchedProfiles
                    && matchedProfiles.map((profile, profileIndex) => <MatchedProfileCard
                        profile={profile}
                        key={profileIndex}
                    />)
                }
            </div>
            <HomeFloatingFooter/>
        </div>
    );
}

export default New;
