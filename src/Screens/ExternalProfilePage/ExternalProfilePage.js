import React, {
    useState,
    useEffect,
} from 'react';
import './ExternalProfilePage.css';
import axios from 'axios';
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
    RiArrowLeftSLine,
} from 'react-icons/ri';
import { Helmet } from 'react-helmet';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { HomeFloatingFooter } from '../../Components/Footers/Footers';
import { HomeLeftTab } from '../../Components/LeftCompartment/LeftCompartment';
import RightCompartment from '../../Components/RightCompartment/RightCompartment';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ExternalProfilePage() {
    const history = useHistory();
    const location = useLocation();

    const locationArr = location.pathname.split('/');
    const userId = locationArr[locationArr.length - 1];

    const [userDetails, setuserDetails] = useState(false);
    const [userSocials, setuserSocials] = useState(false);
    const [userLikes, setuserLikes] = useState(false);

    async function fetchUser() {
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/v1/user/profile`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: userId,
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
                history.push('/');
            }
        }).catch(() => {
            Modal.warn({ content: 'Please check your network connection.' });
        });
    }
    useEffect(() => {
        fetchUser();
    }, []);

    if (userId !== 'profile') {
        return (
            <div className='profile-page-container'>
                <Helmet>
                    {
                        userDetails
                        ? <title>{userDetails.userName}</title>
                        : <title>Profile / Play</title>
                    }
                </Helmet>
                <HomeLeftTab/>
                <div className='profile-page-middle-area'>
                    <div className='profile-button-container'>
                        <RiArrowLeftSLine
                            onClick={() => history.goBack()}
                            style={{
                                fontSize: 32,
                                cursor: 'pointer',
                            }}
                        />
                    </div>
                    {
                        userDetails
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
                            <div className='profileNameText'>
                                {userDetails.userName}
                            </div>
                            <div className='profile-page-bio-text'>
                                {userDetails.userBio}
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
                    <div className='profile-page-elements-container'>
                        <div className='profile-page-elements-heading'>
                            Interest Tags
                        </div>
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
                                    paragraph={{ rows: 4 }}
                                    className='likeContainerSkeleton'
                                />
                            }
                        </div>
                    </div>
                    <Divider className='antd-divider-style'/>
                    {
                        (userSocials.instagram || userSocials.facebook || userSocials.twitter || userSocials.snapchat || userSocials.linkedin) && <div className='profile-page-elements-container'>
                            <div className='profile-page-elements-heading'>
                                Socials
                            </div>
                            <div className='profileSocials'>
                                {
                                    userSocials.instagram && <Dropdown overlay={<Menu><Menu.Item key="0">{userSocials.instagram}</Menu.Item></Menu>}
                                        arrow
                                    >
                                        <RiInstagramFill style={{ fontSize: 32, marginRight: 20, cursor: 'pointer' }} />
                                    </Dropdown>
                                }
                                {
                                    userSocials.facebook && <Dropdown overlay={<Menu><Menu.Item key="1">{userSocials.facebook}</Menu.Item></Menu>}
                                        arrow
                                    >
                                        <RiFacebookBoxFill style={{ fontSize: 32, marginRight: 20, cursor: 'pointer' }} />
                                    </Dropdown>
                                }
                                {
                                    userSocials.twitter && <Dropdown overlay={<Menu><Menu.Item key="2">{userSocials.twitter}</Menu.Item></Menu>}
                                        arrow
                                    >
                                        <RiTwitterFill style={{ fontSize: 32, marginRight: 20, cursor: 'pointer' }} />
                                    </Dropdown>
                                }
                                {
                                    userSocials.snapchat && <Dropdown overlay={<Menu><Menu.Item key="3">{userSocials.snapchat}</Menu.Item></Menu>}
                                        arrow
                                    >
                                        <RiSnapchatFill style={{ fontSize: 32, marginRight: 20, cursor: 'pointer' }} />
                                    </Dropdown>
                                }
                                {
                                    userSocials.linkedin && <Dropdown overlay={<Menu><Menu.Item key="4">{userSocials.linkedin}</Menu.Item></Menu>}
                                        arrow
                                    >
                                        <RiLinkedinBoxFill style={{ fontSize: 32, marginRight: 20, cursor: 'pointer' }} />
                                    </Dropdown>
                                }
                            </div>
                        </div>
                    }
                </div>
                <RightCompartment/>
                <HomeFloatingFooter/>
            </div>
        );
    }
    return (
        <Redirect to='/'/>
    );
}

export default ExternalProfilePage;
