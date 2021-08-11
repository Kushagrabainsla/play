import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import './ProfilePage.css';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'antd';
import axios from 'axios';
import {
    RiHome5Fill,
    RiChatSmile3Fill,
    RiLogoutBoxRFill,
    RiAccountCircleFill,
} from 'react-icons/ri';
import { Context } from '../../Context';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ProfilePage() {
    const [currUser] = useContext(Context);
    const [userDetails, setuserDetails] = useState(false);
    const [userLikes, setuserLikes] = useState(false);

    async function fetchUser() {
        const url = `${process.env.REACT_APP_SERVER_DEV_URL}/user/profile`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: currUser,
            },
        };
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                // console.log(response.data.result);
                setuserDetails(response.data.result.details);
                const moreLikes = [];
                // eslint-disable-next-line no-restricted-syntax
                for (const key in response.data.result.likes) {
                    if (response.data.result.likes[key] > 1) moreLikes.push(key);
                }
                setuserLikes(moreLikes);
            } else {
                Modal.warn({ content: 'Error while loading profile, please refresh !!' });
            }
        }).catch(() => {
            Modal.warn({ content: 'Error while loading profile, please refresh !!' });
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
        <div className='profileContainer'>
            {
                userDetails
                ? <div className='profileTop'>
                    <div className='profileTopLeft'>
                        <img
                            src={formattedPhotoURL(userDetails[3].user_photoURL)}
                            // src='https://avatars.githubusercontent.com/u/72407476?v=4'
                            alt='User Profile Photo'
                            className='profilePhoto'
                        />
                    </div>
                    <div className='profileTopRight'>
                        <div className='profileNameText'>
                            {userDetails[1].user_name}
                        </div>
                        <Link to='/login'>
                            <Button
                                type="primary"
                                shape="round"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                    background: '#0079c1',
                                    fontWeight: '500',
                                }}
                                icon={<RiLogoutBoxRFill style={{ marginRight: 5 }}/>}
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
                : null
            }
            <div className='profileBottom'>
                <div className='profileLikes'>
                    {
                        userLikes
                        ? userLikes.map((keyword, index) => <p
                            key={index}
                            className='likeContainer'
                            >{keyword}</p>)
                        : <p></p>
                    }
                </div>
            </div>
            <div className='profileFloatingFooter'>
                <Link
                    to='/'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiChatSmile3Fill
                        fontSize={32}
                        color='white'
                    />
                </Link>
                <Link
                    to='/'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiHome5Fill
                        fontSize={32}
                        color='white'
                    />
                </Link>
                <Link
                    to='/profile'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiAccountCircleFill
                        fontSize={32}
                        color='white'
                    />
                </Link>
            </div>
        </div>
    );
}

export default ProfilePage;
