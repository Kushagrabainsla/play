import React from 'react';
import './ProfilePage.css';

function ProfilePage() {
    // axios magic for getting the whole profile from the backend by giving the id.
    return (
        <div className='profileContainer'>
            <div className='profile'>
                profile
            </div>
            <div className='profileFloatingFooter'>
                <div>Chats</div>
                <div>Feed</div>
            </div>
        </div>
    );
}

export default ProfilePage;
