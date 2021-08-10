import React from 'react';
import './ProfilePage.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { RiHome5Fill, RiChatSmile3Fill, RiLogoutBoxRFill } from 'react-icons/ri';

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
                    <Link to='/login'>
                        <Button
                            type="primary"
                            shape="round"
                            icon={<RiLogoutBoxRFill/>}
                            className='navbarButton'
                            onClick={() => {
                                // window.gapi.auth2.getAuthInstance().signOut();
                                localStorage.clear();
                                document.location.href = '/#/login';
                            }}
                        >
                            Sign out
                        </Button>
                    </Link>
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
                <Link to='/'>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<RiChatSmile3Fill />}
                        className='navbarButton'
                    >
                        Chats
                    </Button>
                </Link>
                <Link to='/'>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<RiHome5Fill />}
                        className='navbarButton'
                    >
                        Feed
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default ProfilePage;
