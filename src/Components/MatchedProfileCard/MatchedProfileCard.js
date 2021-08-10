import React from 'react';
import './MatchedProfileCard.css';
import PropTypes from 'prop-types';

function MatchedProfileCard(props) {
    const { profile } = props;
    const matchedLikes = Object.keys(profile.matched_likes);

    return (
        <div className='matchedProfile'>
            <div className='matchedProfileTop'>
                <div className='matchedProfileTopLeft'>
                    <img
                        src='https://avatars.githubusercontent.com/u/72407476?v=4'
                        alt='Matched Profile Picture'
                        className='profilePhoto'
                    />
                </div>
                <div className='matchedProfileTopRight'>
                    <p>name</p>
                </div>
            </div>
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
