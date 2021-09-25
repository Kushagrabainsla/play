import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import './LoginPage.css';
import {
    Modal,
    Spin,
} from 'antd';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { updateUserContext } from '../../StateManagement/UserContext';

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest', 'https://people.googleapis.com/$discovery/rest?version=v1'];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

function LoginPage() {
    const toggleUser = useContext(updateUserContext);
    const [isGapiLoaded, setisGapiLoaded] = useState(false);
    const [dataLoading, setdataLoading] = useState(false);
    const [youtubeResponse, setyoutubeResponse] = useState(false);
    const [peopleResponse, setpeopleResponse] = useState(false);

    function initClient() {
        window.gapi.client.init({
            apiKey: process.env.REACT_APP_API_KEY,
            clientId: process.env.REACT_APP_CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        }).then(() => {
            setisGapiLoaded(true);
        }).catch((error) => {
            Modal.warning({ title: error.details });
        });
    }

    useEffect(() => {
        window.gapi.load('client:auth2', initClient);
    }, []);

    async function fetchDataFromAPI() {
        window.gapi.client.people.people.get({
            resourceName: 'people/me',
            personFields: 'names,photos,genders',
        }).then((response) => {
            setpeopleResponse(response);
        }).catch(() => {
            setdataLoading(false);
            Modal.warn({ content: 'Error while loading, please retry !!' });
            // console.log('PEOPLE API', err);
        });
        window.gapi.client.youtube.playlistItems.list({
            part: ['snippet,contentDetails'],
            maxResults: 50,
            playlistId: 'LL',
        }).then((response) => {
            setyoutubeResponse(response);
        }).catch(() => {
            setdataLoading(false);
            Modal.warn({ content: 'Error while loading, please retry !!' });
            // console.log('YOUTUBE API', err);
        });
    }
    useEffect(() => {
        if (youtubeResponse !== false && peopleResponse !== false) {
            const url = `${process.env.REACT_APP_SERVER_PROD_URL}/login`;
            const userDetails = {
                youtubeResponse,
                peopleResponse,
            };
            axios.post(url, userDetails).then((response) => {
                if (response.status === 200 && response.data.error === false) {
                    toggleUser(response.data.result.userID);
                    localStorage.setItem('currUser', response.data.result.userID);
                    localStorage.setItem('token', response.data.result.token);
                }
            }).catch(() => {
                setdataLoading(false);
                Modal.warn({ content: 'Error while updating, please retry !!' });
            });
        }
    }, [youtubeResponse, peopleResponse]);

    function handleSignInClick() {
        window.gapi.auth2.getAuthInstance().signIn().then(() => {
            setdataLoading(true);
            fetchDataFromAPI();
        });
    }

    return (
        <div className='login-page-container'>
            <div className='login-container'>
                <div className='login-right-container'>
                    <div className='login-card'>
                        <div className='login-card-upper'>
                            <div className='login-play-text'>play</div>
                        </div>
                        <div className='login-card-lower'>
                            {
                                isGapiLoaded === true
                                ? <div className='google-button' onClick={handleSignInClick}>
                                    {
                                        dataLoading
                                        ? <Spin
                                            spinning={dataLoading}
                                            indicator={<LoadingOutlined style={{ fontSize: 30, color: '#264653' }} spin />}
                                            size="large"
                                        />
                                        : <img alt='' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'/>
                                    }
                                    Sign up with Google
                                </div>
                                : 'Loading...'
                            }
                        </div>
                    </div>
                    <div className='login-additionals-container'>
                        <div className='additionals-text'>Privary Policy</div>
                        <div className='additionals-text'>FAQ</div>
                        <div className='additionals-text'>{'Terms & Conditions'}</div>
                    </div>
                </div>
                <div className='login-left-container'>
                    <div className='login-picture-container'>
                        <img
                            alt='random social pictures'
                            src='https://github.com/Kushagrabainsla/play/blob/master/public/social_picture.jpg?raw=true'
                            className='login-picture'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
