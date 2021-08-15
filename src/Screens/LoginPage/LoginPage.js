import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import './LoginPage.css';
import axios from 'axios';
import {
    Modal,
} from 'antd';
import { updateContext } from '../../Context';

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest', 'https://people.googleapis.com/$discovery/rest?version=v1'];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.emails.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

function LoginPage() {
    const toggleUser = useContext(updateContext);
    const [isGapiLoaded, setisGapiLoaded] = useState(false);
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
            console.log(error);
            // console.log(JSON.stringify(error, null, 2));
            // Modal.warn({ content: 'Error while loading, please refresh !!' });
            // Change this after adding endpoint.
            // Modal.info({ content: 'Sorry, you do not have access to this application.' });
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
            Modal.warn({ content: 'Error while loading, please refresh !!' });
            // console.log('PEOPLE API', err);
        });
        window.gapi.client.youtube.playlistItems.list({
            part: ['snippet,contentDetails'],
            maxResults: 50,
            playlistId: 'LL',
        }).then((response) => {
            setyoutubeResponse(response);
        }).catch(() => {
            Modal.warn({ content: 'Error while loading, please refresh !!' });
            // console.log('YOUTUBE API', err);
        });
    }
    useEffect(() => {
        if (youtubeResponse !== false && peopleResponse !== false) {
            const url = `${process.env.REACT_APP_SERVER_DEV_URL}/login`;
            // const url = `${process.env.REACT_APP_SERVER_PROD_URL}/login`;
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
                Modal.warn({ content: 'Error while loading, please refresh !!' });
                // console.log(err);
            });
        }
    }, [youtubeResponse, peopleResponse]);

    function handleSignInClick() {
        window.gapi.auth2.getAuthInstance().signIn();
        fetchDataFromAPI();
    }

    return (
        <div className='loginContainer'>
            <div className='loginTop'>
                <div className='loginTopColourFill'>
                    <img
                        src='https://raw.githubusercontent.com/Kushagrabainsla/play/master/public/playLogo.png'
                        alt='Play Logo'
                        className='loginPagePlayLogo'
                    />
                </div>
                <div className="custom-shape-divider-top-1628334449">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>
            <div className='loginBottom'>
                {
                    isGapiLoaded
                    ? <div className='googleButton' onClick={handleSignInClick}>
                        <img alt='' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' className='loginGoogleLogo' />
                        Sign in with Google
                    </div>
                    : null
                }
            </div>
        </div>
    );
}

export default LoginPage;
