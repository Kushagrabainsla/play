import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import './ProfilePage.css';
import { Link } from 'react-router-dom';
import {
    Button,
    Modal,
    Menu,
    Dropdown,
    Form,
    Input,
    Select,
    Row,
    Skeleton,
} from 'antd';
import axios from 'axios';
import {
    RiHome5Fill,
    RiChatSmile3Fill,
    RiLogoutBoxRFill,
    RiAccountCircleFill,
    RiMenuFill,
    RiAddCircleFill,
    RiTwitterFill,
    RiFacebookBoxFill,
    RiSnapchatFill,
    RiInstagramFill,
    RiLinkedinBoxFill,
} from 'react-icons/ri';
import { Context } from '../../StateManagement/Context';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ProfilePage() {
    const { Option } = Select;
    const [currUser] = useContext(Context);
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
                Modal.warn({ content: 'Error while loading profile, please refresh !!' });
            }
        }).catch(() => {
            Modal.warn({ content: 'Error while loading profile, please refresh !!' });
        });
    }
    useEffect(() => {
        fetchUser();
    }, []);

    // --------------------------- ADDING SOCIAL MEDIA MODAL ------------------------------
    const [socialVisible, setsocialVisible] = useState(false);
    const [socialConfirmLoading, setsocialConfirmLoading] = useState(false);

    const showsocialModal = () => setsocialVisible(true);
    const socialHandleCancel = () => setsocialVisible(false);
    const onSocialFinishFailed = (errorInfo) => Modal.error({ content: errorInfo });

    const onSocialFinish = (values) => {
        setsocialConfirmLoading(true);
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/updateSocials`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: currUser,
            },
        };
        const socials = values;
        axios.put(url, socials, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setsocialVisible(false);
                setsocialConfirmLoading(false);
                Modal.success({ content: response.data.message });
            } else {
                Modal.warn({ content: 'Error while updating socials !!' });
            }
        }).catch(() => {
            Modal.warn({ content: 'Error while updating socials !!' });
        });
    };

    function formattedPhotoURL(url) {
        const formattedList = url.split('=');
        formattedList[formattedList.length - 1] = 's300';
        const formattedUrl = formattedList.join('=');
        return formattedUrl;
    }
    const optionsMenu = (
        <Menu
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '15px',
            }}
        >
            <Menu.Item key="0">
                <Button
                    type="ghost"
                    shape="round"
                    style={{
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        background: '#2a9d8f',
                        fontWeight: '500',
                    }}
                    icon={<RiAddCircleFill style={{ marginRight: 5 }}/>}
                    onClick={() => {
                        showsocialModal();
                    }}
                >
                    Add Socials
                </Button>
            </Menu.Item>
            <Menu.Divider />
            <Link to='/'>
                <Menu.Item key="1">
                    <Button
                        type="ghost"
                        shape="round"
                        style={{
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            background: '#2a9d8f',
                            fontWeight: '500',
                        }}
                        icon={<RiLogoutBoxRFill style={{ marginRight: 5 }}/>}
                        onClick={() => {
                            if (window.gapi.auth2.getAuthInstance()) {
                                window.gapi.auth2.getAuthInstance().signOut();
                            }
                            localStorage.clear();
                            document.location.href = '/play';
                        }}
                    >
                        Sign out
                    </Button>
                </Menu.Item>
            </Link>
        </Menu>
    );

    return (
        <div className='profileContainer'>
            {
                userDetails && userSocials
                ? <div className='profileTop'>
                    <div className='profileTopLeft'>
                        <img
                            src={formattedPhotoURL(userDetails.userPhotoURL)}
                            alt='User Profile Photo'
                            className='profilePhoto'
                        />
                    </div>
                    <div className='profileTopMid'>
                        <div className='profileNameText'>
                            {userDetails.userName}
                        </div>
                        <div className='profileSocials'>
                            {
                                userSocials.instagram && <Dropdown overlay={<Menu><Menu.Item key="0">{userSocials.instagram}</Menu.Item></Menu>} arrow>
                                    <RiInstagramFill style={{ fontSize: 32, marginRight: 5, cursor: 'pointer' }} />
                                </Dropdown>
                            }
                            {
                                userSocials.facebook && <Dropdown overlay={<Menu><Menu.Item key="1">{userSocials.facebook}</Menu.Item></Menu>} arrow>
                                    <RiFacebookBoxFill style={{ fontSize: 32, marginRight: 5, cursor: 'pointer' }} />
                                </Dropdown>
                            }
                            {
                                userSocials.twitter && <Dropdown overlay={<Menu><Menu.Item key="2">{userSocials.twitter}</Menu.Item></Menu>} arrow>
                                    <RiTwitterFill style={{ fontSize: 32, marginRight: 5, cursor: 'pointer' }} />
                                </Dropdown>
                            }
                            {
                                userSocials.snapchat && <Dropdown overlay={<Menu><Menu.Item key="3">{userSocials.snapchat}</Menu.Item></Menu>} arrow>
                                    <RiSnapchatFill style={{ fontSize: 32, marginRight: 5, cursor: 'pointer' }} />
                                </Dropdown>
                            }
                            {
                                userSocials.linkedin && <Dropdown overlay={<Menu><Menu.Item key="4">{userSocials.linkedin}</Menu.Item></Menu>} arrow>
                                    <RiLinkedinBoxFill style={{ fontSize: 32, marginRight: 5, cursor: 'pointer' }} />
                                </Dropdown>
                            }
                        </div>
                    </div>
                    <div className='profileTopRight'>
                        <Dropdown
                            overlay={optionsMenu}
                            placement="bottomRight"
                            trigger={['click']}
                        >
                            <RiMenuFill
                                onClick={(e) => e.preventDefault()}
                                style={{
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </Dropdown>
                    </div>
                </div>
                : <Skeleton
                    active
                    className='profileLikes'
                />

            }
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
                            className='profileLikes'
                        />
                    }
                </div>
            </div>
            <div className='profileFloatingFooter'>
                <Link
                    to='/chats'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiChatSmile3Fill
                        fontSize={32}
                        color='lightgrey'
                    />
                </Link>
                <Link
                    to='/'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiHome5Fill
                        fontSize={32}
                        color='lightgrey'
                    />
                </Link>
                <Link
                    to='/profile'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiAccountCircleFill
                        fontSize={35}
                        color='white'
                    />
                </Link>
            </div>
            <Modal
                title="Add Social Media"
                visible={socialVisible}
                confirmLoading={socialConfirmLoading}
                onCancel={socialHandleCancel}
                footer={[]}
                getContainer={false}
            >
                <Form
                    name="basic"
                    initialValues={{ remember: false }}
                    onFinish={onSocialFinish}
                    onFinishFailed={onSocialFinishFailed}
                    layout={'horizontal'}
                >
                    <Form.Item
                        label="Choose Platform"
                        name="socialName"
                        rules={[
                            {
                                required: true,
                                message: 'Select a platform !',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a platform"
                            allowClear
                        >
                            {
                                ['Instagram', 'Linkedin', 'Twitter', 'Facebook', 'Snapchat'].map((socialMedia, index) => <Option
                                    value={socialMedia}
                                    key={index}
                                >
                                    {socialMedia}
                                </Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Enter Your profile Id / Url"
                        name="userHandle"
                        rules={[
                            {
                                required: true,
                                message: 'Enter URL for your social media ID !',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Row justify="end">
                            <Button
                                htmlType="submit"
                                shape="round"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                    background: '#2a9d8f',
                                    fontWeight: '500',
                                    color: 'white',
                                }}
                                icon={<RiAddCircleFill style={{ marginRight: 5 }}/>}
                            >
                                Submit
                            </Button>

                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ProfilePage;
