import React, {
    useEffect,
    useState,
} from 'react';
import './MatchedProfileCard.css';
import PropTypes from 'prop-types';
import {
    Modal,
    Collapse,
    Divider,
    Avatar,
} from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;
const { Panel } = Collapse;

function MatchedProfileCard(props) {
    const { profile } = props;
    const matchedLikes = Object.keys(profile.matched_likes);

    const [avatarSize, setavatarSize] = useState(1400);
    const [matchedDetails, setmatchedDetails] = useState(false);

    async function fetchUser() {
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/v1/user/profile`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: profile.user_id,
            },
        };
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setmatchedDetails(response.data.result.details);
            }
        }).catch(() => {
            Modal.warn({ content: 'Please check your network connection.' });
        });
    }
    useEffect(() => {
        window.addEventListener('resize', () => {
            setavatarSize(document.body.clientWidth);
        });
        setavatarSize(document.body.clientWidth);
        fetchUser();
    }, []);

    return (
        <div className='matchedProfile'>
            {
                matchedDetails
                ? <div className='matchedProfileTop'>
                    <div className='matchedProfileTopLeft'>
                        <Avatar
                            style={{
                                border: '2px solid white',
                                boxShadow: '2px 1px 10px lightgrey',
                            }}
                            size={avatarSize > 400 ? 100 : 80}
                            src={matchedDetails.userPhotoURL}
                        />
                    </div>
                    <div className='matchedProfileTopRight'>
                        <div className='matchedProfileNameText'>
                            {matchedDetails.userName}
                        </div>
                        {
                            matchedDetails.userGender === 'Male'
                            ? <div className='interestTagText'>Tap an interest tag to begin a conversation with him.</div>
                            : <div className='interestTagText'>Tap an interest tag to begin a conversation with her.</div>
                        }
                    </div>
                </div>
                : null
            }
            <Divider/>
            <div className='matchedProfileBottom'>
                <Collapse ghost >
                    <Panel
                        header="Tap to view interest tags"
                        key="1"
                        className="site-collapse-custom-panel"
                    >
                        {
                            matchedLikes.map((tag, tagIndex) => <Link
                                key={tagIndex}
                                to={{
                                    pathname: '/chats/room',
                                    state: {
                                        receiver: {
                                            userId: matchedDetails.userId,
                                            userProfilePhoto: matchedDetails.userPhotoURL,
                                            username: matchedDetails.userName,
                                        },
                                    },
                                }}
                            >
                                <p className='likeContainer'>
                                    { tag }
                                </p>
                            </Link>)
                        }
                    </Panel>
                </Collapse>
            </div>
        </div>
    );
}

MatchedProfileCard.propTypes = {
    profile: PropTypes.any,
};

export default MatchedProfileCard;
