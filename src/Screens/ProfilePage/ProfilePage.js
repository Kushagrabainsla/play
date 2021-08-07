import React from 'react';
import './ProfilePage.css';

function ProfilePage() {
    const userlikes = ['svsf', 'fvd', 'fvs', 'fvds', 'fvdsffvsdfv', 'svasfvf'];
    return (
        <div className='profileContainer'>
            <div className='profileTop'>
                <div className='profileTopLeft'>
                    <img
                        src='https://avatars.githubusercontent.com/u/72407476?v=4'
                        alt='User Profile Photo'
                        className='profilePhoto'
                    />
                </div>
                <div className='profileTopRight'>
                    <p style={{ fontWeight: '600' }}>Name</p>
                    <p style={{ fontWeight: '300' }}>user@provider.com</p>
                    <div>Sign out</div>
                </div>
            </div>
            <div className='profileBottom'>
                <div className='profileLikes'>
                    {
                        userlikes
                        ? userlikes.map((keyword, index) => <p
                            key={index}
                            className='likeContainer'
                            >{keyword}</p>)
                        : <p></p>
                    }
                </div>
            </div>
            <div className='profileFloatingFooter'>
                <div>Chats</div>
                <div>Feed</div>
            </div>
        </div>
    );
}

export default ProfilePage;
