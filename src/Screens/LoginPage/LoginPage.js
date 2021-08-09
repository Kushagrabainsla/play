import React, { useEffect } from 'react';
import './LoginPage.css';

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest', 'https://people.googleapis.com/$discovery/rest?version=v1'];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.emails.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

function LoginPage() {
    function initClient() {
        window.gapi.client.init({
            apiKey: process.env.REACT_APP_API_KEY,
            clientId: process.env.REACT_APP_CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        }).then(() => {
            console.log('GAPI client loaded for API');
        }).catch((error) => {
            console.log(JSON.stringify(error, null, 2));
        });
    }

    useEffect(() => {
        window.gapi.load('client:auth2', initClient);
    });

    function handleSignInClick() {
        window.gapi.auth2.getAuthInstance().signIn();
        localStorage.setItem('loggedIn', true);
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
                <div className='googleButton' onClick={() => handleSignInClick()}>
                    <img alt='' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' className='loginGoogleLogo' />
                    Sign in with Google
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
