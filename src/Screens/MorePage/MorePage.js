import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import './MorePage.css';
import {
    Button,
    Modal,
    Form,
    Input,
    Select,
    Row,
    Divider,
    Upload,
    Progress,
    Avatar,
    Badge,
} from 'antd';
import {
    RiLogoutBoxRFill,
    RiAddCircleFill,
    RiShareFill,
    RiDeleteBin6Fill,
    RiHonourFill,
    RiEdit2Fill,
} from 'react-icons/ri';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TwitterShareButton,
    TwitterIcon,
} from 'react-share';
import axios from 'axios';
import FormData from 'form-data';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { UserContext } from '../../StateManagement/UserContext';
import { MoreFloatingFooter } from '../../Components/Footers/Footers';
import { MoreLeftTab } from '../../Components/LeftCompartment/LeftCompartment';
import RightCompartment from '../../Components/RightCompartment/RightCompartment';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function MorePage() {
    const { Option } = Select;
    const [currUser] = useContext(UserContext);
    const [userDetails, setuserDetails] = useState(false);

    async function fetchUser() {
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/v1/user/profile`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: currUser,
            },
        };
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setuserDetails(response.data.result.details);
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

    function signOut() {
        if (window.gapi.auth2.getAuthInstance()) {
            window.gapi.auth2.getAuthInstance().signOut();
        }
        localStorage.clear();
        document.location.href = '/';
    }

    // --------------------------- ADDING SOCIAL MEDIA MODAL ------------------------------
    const [socialVisible, setsocialVisible] = useState(false);
    const [socialConfirmLoading, setsocialConfirmLoading] = useState(false);

    const showsocialModal = () => setsocialVisible(true);
    const socialHandleCancel = () => setsocialVisible(false);
    const onSocialFinishFailed = (errorInfo) => Modal.error({ content: errorInfo });

    const onSocialFinish = (values) => {
        setsocialConfirmLoading(true);
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/v1/updateSocials`;
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
                Modal.warn({ content: 'Please check your network connection.' });
            }
        }).catch(() => {
            Modal.warn({ content: 'Please check your network connection.' });
        });
    };

    // --------------------------- SHARE WITH FRIENDS MODAL --------------------------
    const [shareVisible, setshareVisible] = useState(false);
    const showshareModal = () => setshareVisible(true);
    const shareHandleCancel = () => setshareVisible(false);

    // --------------------------- PROFILE EDIT MODAL ------------------------------
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };
    const [profileEditVisible, setprofileEditVisible] = useState(false);
    const [profileEditConfirmLoading, setprofileEditConfirmLoading] = useState(false);
    const [availableImageForUpload, setavailableImageForUpload] = useState(false);

    const showProfileEditModal = () => setprofileEditVisible(true);
    const profileEditHandleCancel = () => setprofileEditVisible(false);
    const onProfileEditFinishFailed = (errorInfo) => Modal.error({ content: errorInfo });

    const onProfileEditFinish = (values) => {
        setprofileEditConfirmLoading(true);
        const profileForm = new FormData();
        profileForm.append('userName', values.name);
        profileForm.append('userBio', values.bio);
        profileForm.append('userImage', values.image ? values.image[0].originFileObj : null);

        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/v1/user/update`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userID: currUser,
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.lengthComputable) {
                   const uploadPercentage = (progressEvent.loaded / progressEvent.total) * 100;
                   setavailableImageForUpload(uploadPercentage);
                }
            },
        };

        axios.put(url, profileForm, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setprofileEditVisible(false);
                setprofileEditConfirmLoading(false);
                Modal.success({ content: response.data.message });
            } else {
                Modal.error({ content: response.data.message });
            }
            setavailableImageForUpload(false);
        }).catch(() => {
            Modal.error({ content: 'Please check your network connection.' });
            setavailableImageForUpload(false);
        });
    };

    return (
        <div className='more-page-container'>
            <Helmet>
                <title>Home / Play</title>
            </Helmet>
            <MoreLeftTab/>
            <div className='more-page-middle-area'>
                <Divider className='antd-divider-style'/>
                <div
                    className='more-page-option-container'
                    onClick={showsocialModal}
                >
                    <RiAddCircleFill className='more-page-option-icon'/>
                    <div className='more-page-option-text'>Add socials</div>
                </div>
                <Divider className='antd-divider-style'/>
                <div
                    className='more-page-option-container'
                    onClick={showProfileEditModal}
                >
                    <RiEdit2Fill className='more-page-option-icon'/>
                    <div className='more-page-option-text'>Edit profile</div>
                </div>
                <Divider className='antd-divider-style'/>
                <div
                    className='more-page-option-container'
                    onClick={showshareModal}
                >
                    <RiShareFill className='more-page-option-icon'/>
                    <div className='more-page-option-text'>Tell a friend</div>
                </div>
                <Divider className='antd-divider-style'/>
                <Link
                    to='/privacy-policy'
                    className='more-page-option-container'
                >
                    <RiHonourFill className='more-page-option-icon'/>
                    <div className='more-page-option-text'>Privacy policy</div>
                </Link>
                <Divider className='antd-divider-style'/>
                <div
                    className='more-page-option-container'
                    onClick={() => {
                        Modal.warning({
                            title: 'Are you sure you want to delete your account ?',
                            okText: 'Yes',
                            closable: true,
                            onOk: signOut,
                        });
                    }}
                >
                    <RiDeleteBin6Fill className='more-page-option-icon'/>
                    <div className='more-page-option-text'>Delete account</div>
                </div>
                <Divider className='antd-divider-style'/>
                <div
                    className='more-page-option-container'
                    onClick={() => {
                        Modal.warning({
                            title: 'Are you sure you want to log out ?',
                            okText: 'Yes',
                            closable: true,
                            onOk: signOut,
                        });
                    }}
                >
                    <RiLogoutBoxRFill className='more-page-option-icon'/>
                    <div className='more-page-option-text'>Log out</div>
                </div>
                <Divider className='antd-divider-style'/>

            </div>
            <RightCompartment/>
            <MoreFloatingFooter/>
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
            <Modal
                title="Share it with your friends."
                visible={shareVisible}
                onCancel={shareHandleCancel}
                footer={[]}
                getContainer={false}
            >
                <div className='share-modal-container'>
                    <EmailShareButton
                        url='https://officialplay.me'
                        body='Play - The social you always wanted.'
                    >
                        <EmailIcon size={36} round={true}/>
                    </EmailShareButton>
                    <FacebookShareButton
                        url='https://officialplay.me'
                        quote='Play - The social you always wanted.'
                        hashtag='#play'
                    >
                        <FacebookIcon size={36} round={true}/>
                    </FacebookShareButton>
                    <LinkedinShareButton
                        url='https://officialplay.me'
                        title='Play'
                        summary='Play - The social you always wanted.'
                    >
                        <LinkedinIcon size={36} round={true}/>
                    </LinkedinShareButton>
                    <TelegramShareButton
                        url='https://officialplay.me'
                        title='Play - The social you always wanted.'
                    >
                        <TelegramIcon size={36} round={true}/>
                    </TelegramShareButton>
                    <WhatsappShareButton
                        url='https://officialplay.me'
                        title='Play - The social you always wanted.'
                    >
                        <WhatsappIcon size={36} round={true}/>
                    </WhatsappShareButton>
                    <TwitterShareButton
                        url='https://officialplay.me'
                        title='Play - The social you always wanted.'
                        hashtag='#play'
                    >
                        <TwitterIcon size={36} round={true}/>
                    </TwitterShareButton>
                </div>
            </Modal>
            <Modal
                title="Edit profile"
                visible={profileEditVisible}
                confirmLoading={profileEditConfirmLoading}
                onCancel={profileEditHandleCancel}
                footer={[]}
                getContainer={false}
            >
                <Form
                    name="basic"
                    initialValues={{
                        name: userDetails && userDetails.userName,
                        // bio: userDetails && userDetails.userBio
                        bio: 'Your Bio',
                    }}
                    onFinish={onProfileEditFinish}
                    onFinishFailed={onProfileEditFinishFailed}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Form.Item
                        name="image"
                        label=""
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name='file'
                            listType='picture'
                            beforeUpload={() => false}
                            accept='image/*'
                        >
                            <Badge
                                count={<RiAddCircleFill size={20} color='#2a9d8f'/>}
                                offset={[-20, 90]}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                <Avatar
                                    size={100}
                                    src={userDetails && userDetails.userPhotoURL}
                                    style={{
                                        cursor: 'pointer',
                                        border: '2px solid white',
                                        boxShadow: '2px 1px 10px lightgrey',
                                    }}
                                />
                            </Badge>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Name can’t be blank',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Bio"
                        name="bio"
                        style={{ width: '100%', paddingLeft: '10px' }}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item style={{ width: '100%' }}>
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
                {
                    availableImageForUpload && <Progress
                        strokeColor={{
                            '0%': '#68f3e3',
                            '100%': '#2a9d8f',
                        }}
                        percent={availableImageForUpload}
                        format={() => Math.round(availableImageForUpload * 10) / 10}
                        status="active"
                    />
                }
            </Modal>
        </div>
    );
}

export default MorePage;
