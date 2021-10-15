import React, {
    useState,
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
} from 'antd';
import {
    RiLogoutBoxRFill,
    RiAddCircleFill,
    RiShareFill,
    RiDeleteBin6Fill,
    RiHonourFill,
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

    // --------------------------- SHARE WITH FRIENDS MODAL ------------------------------
    const [shareVisible, setshareVisible] = useState(false);
    const showshareModal = () => setshareVisible(true);
    const shareHandleCancel = () => setshareVisible(false);

    function signOut() {
        if (window.gapi.auth2.getAuthInstance()) {
            window.gapi.auth2.getAuthInstance().signOut();
        }
        localStorage.clear();
        document.location.href = '/';
    }

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
                    onClick={() => {
                        showsocialModal();
                    }}
                >
                    <RiAddCircleFill className='more-page-option-icon'/>
                    <div className='more-page-option-text'>Add Socials</div>
                </div>
                <Divider className='antd-divider-style'/>
                <div
                    className='more-page-option-container'
                    onClick={() => {
                        showshareModal();
                    }}
                >
                    <RiShareFill className='more-page-option-icon'/>
                    <div className='more-page-option-text'>Tell a friend</div>
                </div>
                <Divider className='antd-divider-style'/>
                <Link to='/privacy-policy' className='more-page-option-container'>
                    <RiHonourFill className='more-page-option-icon'/>
                    <div className='more-page-option-text'>Privacy Policy</div>
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
                    <div className='more-page-option-text'>Delete Account</div>
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
        </div>
    );
}

export default MorePage;
