import React from 'react';
import './HomePage.css';

function HomePage() {
    const matches = [
        {
            name: 'user',
            tags: ['ryr', 'gbg', 'fdvdfsv', 'dsfbdgb'],
            photoUrl: 'https://avatars.githubusercontent.com/u/72407476?v=4',
        },
        {
            name: 'user',
            tags: ['ryr', 'gbg', 'fdvdfsv', 'dsfbdgb'],
            photoUrl: 'https://avatars.githubusercontent.com/u/72407476?v=4',
        },
        {
            name: 'user',
            tags: ['ryr', 'gbg', 'fdvdfsv', 'dsfbdgb'],
            photoUrl: 'https://avatars.githubusercontent.com/u/72407476?v=4',
        },
        {
            name: 'user',
            tags: ['ryr', 'gbg', 'fdvdfsv', 'dsfbdgb'],
            photoUrl: 'https://avatars.githubusercontent.com/u/72407476?v=4',
        },
    ];
    return (
        <div className='homeContainer'>
            <div className='matchedProfilesContainer'>
                {
                    matches.map((matchedProfile, profileIndex) => <div key={profileIndex} className='matchedProfile'>
                        <div className='matchedProfileTop'>
                            <div className='matchedProfileTopLeft'>
                                <img
                                    src={matchedProfile.photoUrl}
                                    alt='Matched Profile Picture'
                                    className='profilePhoto'
                                />
                            </div>
                            <div className='matchedProfileTopRight'>
                                <p>{matchedProfile.name}</p>
                            </div>
                        </div>
                        <div className='matchedProfileBottom'>
                            {
                                matchedProfile.tags.map((tag, tagIndex) => <p
                                    key={tagIndex}
                                    className='likeContainer'
                                >{tag}</p>)
                            }
                        </div>
                    </div>)
                }
            </div>
            <div className='homeFloatingFooter'>
                <div>Chats</div>
                <div>Profile</div>
            </div>
        </div>
    );
}

export default HomePage;
