import React, {
    useEffect,
    useState,
} from 'react';
import './MatchedProfileCard.css';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import axios from 'axios';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function MatchedProfileCard(props) {
    const { profile } = props;
    const matchedLikes = Object.keys(profile.matched_likes);
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
                setmatchedDetails(response.data.result.details);
                // console.log(response.data.result.details);
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
                            className='profilePhoto'
                        />
                    </div>
                    <div className='matchedProfileTopRight'>
                        <div className='profileNameText'>
                            {matchedDetails[1].user_name}
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
                    matchedLikes.map((tag, tagIndex) => <p
                        key={tagIndex}
                        className='likeContainer'
                    >{tag}</p>)
                }
            </div>
        </div>
    );
}

MatchedProfileCard.propTypes = {
    profile: PropTypes.any,
};

export default MatchedProfileCard;
