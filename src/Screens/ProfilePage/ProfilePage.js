import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import './ProfilePage.css';
import {
    Modal,
    Menu,
    Dropdown,
    Skeleton,
    Avatar,
    Divider,
} from 'antd';
import {
    RiTwitterFill,
    RiFacebookBoxFill,
    RiSnapchatFill,
    RiInstagramFill,
    RiLinkedinBoxFill,
} from 'react-icons/ri';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { UserContext } from '../../StateManagement/UserContext';
import { ProfileFloatingFooter } from '../../Components/Footers/Footers';
import { ProfileLeftTab } from '../../Components/LeftCompartment/LeftCompartment';
import RightCompartment from '../../Components/RightCompartment/RightCompartment';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ProfilePage() {
    const [currUser] = useContext(UserContext);
    const [userDetails, setuserDetails] = useState(false);
    const [userSocials, setuserSocials] = useState(false);
    const [userLikes, setuserLikes] = useState(false);

    async function fetchUser() {
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/user/profile`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: currUser,
            },
        };
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setuserSocials(response.data.result.socials);
                setuserDetails(response.data.result.details);
                const moreLikes = [];
                // eslint-disable-next-line no-restricted-syntax
                for (const key in response.data.result.likes) {
                    if (response.data.result.likes[key] > 1) moreLikes.push(key);
                }
                setuserLikes(moreLikes);
            } else {
                Modal.warn({ content: 'Please check your network connection.' });
            }
        }).catch(() => {
            Modal.warn({ content: 'Please check your network connection.' });
        });
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className='profile-page-container'>
            <Helmet>
                {
                    userDetails
                    ? <title>{userDetails.userName}</title>
                    : <title>Profile / Play</title>
                }
            </Helmet>
            <ProfileLeftTab/>
            <div className='profile-page-middle-area'>
                {
                    userDetails && userSocials
                    ? <div className='profileTop'>
                        <div className='profilePhotoContainer'>
                            <Avatar
                                size={120}
                                style={{
                                    border: '2px solid white',
                                    boxShadow: '2px 1px 10px lightgrey',
                                }}
                                src={userDetails.userPhotoURL}
                            />
                        </div>
                        <div className='profileSocials'>
                            {
                                userSocials.instagram && <Dropdown overlay={<Menu><Menu.Item key="0">{userSocials.instagram}</Menu.Item></Menu>}
                                    arrow
                                >
                                    <RiInstagramFill style={{ fontSize: 32, marginRight: 5, cursor: 'pointer' }} />
                                </Dropdown>
                            }
                            {
                                userSocials.facebook && <Dropdown overlay={<Menu><Menu.Item key="1">{userSocials.facebook}</Menu.Item></Menu>}
                                    arrow
                                >
                                    <RiFacebookBoxFill style={{ fontSize: 32, marginRight: 5, cursor: 'pointer' }} />
                                </Dropdown>
                            }
                            {
                                userSocials.twitter && <Dropdown overlay={<Menu><Menu.Item key="2">{userSocials.twitter}</Menu.Item></Menu>}
                                    arrow
                                >
                                    <RiTwitterFill style={{ fontSize: 32, marginRight: 5, cursor: 'pointer' }} />
                                </Dropdown>
                            }
                            {
                                userSocials.snapchat && <Dropdown overlay={<Menu><Menu.Item key="3">{userSocials.snapchat}</Menu.Item></Menu>}
                                    arrow
                                >
                                    <RiSnapchatFill style={{ fontSize: 32, marginRight: 5, cursor: 'pointer' }} />
                                </Dropdown>
                            }
                            {
                                userSocials.linkedin && <Dropdown overlay={<Menu><Menu.Item key="4">{userSocials.linkedin}</Menu.Item></Menu>}
                                    arrow
                                >
                                    <RiLinkedinBoxFill style={{ fontSize: 32, marginRight: 5, cursor: 'pointer' }} />
                                </Dropdown>
                            }
                        </div>
                        <div className='profileNameText'>
                            {userDetails.userName}
                        </div>
                    </div>
                    : <Skeleton
                        active
                        title={false}
                        avatar={{ size: 100 }}
                        className='profileDetailsSkeleton'
                    />
                }
                <Divider className='antd-divider-style'/>
                <div className='profileBottom'>
                    <div className='profileLikes'>
                        {
                            userLikes
                            ? userLikes.map((keyword, index) => <p
                                key={index}
                                className='likeContainer'
                                >{keyword}</p>)
                            : <Skeleton
                                active
                                title={false}
                                paragraph={{ rows: 6 }}
                                className='likeContainerSkeleton'
                            />
                        }
                    </div>
                </div>
            </div>
            <RightCompartment/>
            <ProfileFloatingFooter/>
        </div>
    );
}

export default ProfilePage;
