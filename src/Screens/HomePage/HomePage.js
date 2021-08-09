import React, { useEffect } from 'react';
import './HomePage.css';

function HomePage() {
    function fetchDataFromAPI() {
        window.gapi.client.people.people.get({
            resourceName: 'people/me',
            personFields: 'names,photos',
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log('PEOPLE API', err);
        });

        window.gapi.client.youtube.playlistItems.list({
            part: ['snippet,contentDetails'],
            maxResults: 50,
            playlistId: 'LL',
        }).then((response) => {
            console.log(response.result);
            // Axios post request to backend,
            // for posting the desired stuff like ligin credentials and youtube data.
        }).catch((err) => {
            console.log('YOUTUBE API', err);
        });
    }
    useEffect(() => {
        console.log(window.gapi.client);
        // if (window.gapi.client) fetchDataFromAPI();
    }, [window.gapi.client]);

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
                <button onClick={() => fetchDataFromAPI()}>Chats</button>
                <div>Profile</div>
            </div>
        </div>
    );
}

export default HomePage;
