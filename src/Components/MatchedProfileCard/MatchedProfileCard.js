import React, {
    useEffect,
    useState,
} from 'react';
import './MatchedProfileCard.css';
import PropTypes from 'prop-types';
import {
    Modal,
    Menu,
    Dropdown,
} from 'antd';
import {
    RiTwitterFill,
    RiFacebookBoxFill,
    RiSnapchatFill,
    RiInstagramFill,
    RiLinkedinBoxFill,
} from 'react-icons/ri';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function MatchedProfileCard(props) {
    const { profile } = props;
    const matchedLikes = Object.keys(profile.matched_likes);
    const [matchedSocials, setmatchedSocials] = useState(false);
    const [matchedDetails, setmatchedDetails] = useState(false);

    async function fetchUser() {
        const url = `${process.env.REACT_APP_SERVER_DEV_URL}/user/profile`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: profile.user_id,
            },
        };
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setmatchedSocials(response.data.result.socials);
                setmatchedDetails(response.data.result.details);
            }
        }).catch(() => {
            // console.log(err);
            Modal.warn({ content: 'Error while loading, please refresh !!' });
        });
    }
    useEffect(() => {
        fetchUser();
    }, []);

    function formattedPhotoURL(url) {
        const formattedList = url.split('=');
        formattedList[formattedList.length - 1] = 's300';
        const formattedUrl = formattedList.join('=');
        return formattedUrl;
    }

    return (
        <div className='matchedProfile'>
            {
                matchedDetails
                ? <div className='matchedProfileTop'>
                    <div className='matchedProfileTopLeft'>
                        <img
                            src={formattedPhotoURL(matchedDetails[3].user_photoURL)}
                            alt='Matched Profile Picture'
                            className='matchedProfileProfilePhoto'
                        />
                    </div>
                    <div className='matchedProfileTopRight'>
                        <div className='matchedProfileNameText'>
                            {matchedDetails[1].user_name}
                        </div>
                        <div className='profileSocials'>
                            {
                                matchedSocials && matchedSocials.instagram && <Dropdown overlay={<Menu><Menu.Item key="0">{matchedSocials.instagram}</Menu.Item></Menu>} arrow>
                                    <RiInstagramFill style={{ fontSize: 32, marginRight: 5 }} />
                                </Dropdown>
                            }
                            {
                                matchedSocials && matchedSocials.facebook && <Dropdown overlay={<Menu><Menu.Item key="0">{matchedSocials.facebook}</Menu.Item></Menu>} arrow>
                                    <RiFacebookBoxFill style={{ fontSize: 32, marginRight: 5 }} />
                                </Dropdown>
                            }
                            {
                                matchedSocials && matchedSocials.twitter && <Dropdown overlay={<Menu><Menu.Item key="0">{matchedSocials.twitter}</Menu.Item></Menu>} arrow>
                                    <RiTwitterFill style={{ fontSize: 32, marginRight: 5 }} />
                                </Dropdown>
                            }
                            {
                                matchedSocials && matchedSocials.snapchat && <Dropdown overlay={<Menu><Menu.Item key="0">{matchedSocials.snapchat}</Menu.Item></Menu>} arrow>
                                    <RiSnapchatFill style={{ fontSize: 32, marginRight: 5 }} />
                                </Dropdown>
                            }
                            {
                                matchedSocials && matchedSocials.linkedin && <Dropdown overlay={<Menu><Menu.Item key="0">{matchedSocials.linkedin}</Menu.Item></Menu>} arrow>
                                    <RiLinkedinBoxFill style={{ fontSize: 32, marginRight: 5 }} />
                                </Dropdown>
                            }
                        </div>
                        {
                            matchedDetails[2].user_gender === 'Male'
                            ? <div className='interestTagText'>Tap an interest tag to begin a conversation with him.</div>
                            : <div className='interestTagText'>Tap an interest tag to begin a conversation with her.</div>
                        }
                    </div>
                </div>
                : null
            }
            <div className='matchedProfileBottom'>
                {
                    matchedLikes.map((tag, tagIndex) => <Link
                        key={tagIndex}
                        to='/chats/room'
                    >
                        <p className='likeContainer'>
                            { tag }
                        </p>
                    </Link>)
                }
            </div>
        </div>
    );
}

MatchedProfileCard.propTypes = {
    profile: PropTypes.any,
};

export default MatchedProfileCard;