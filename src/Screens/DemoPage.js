import React, { useEffect } from 'react';

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest', 'https://people.googleapis.com/$discovery/rest?version=v1'];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.emails.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

function DemoPage() {
    function fetchDataFromAPI() {
        window.gapi.client.people.people.get({
            resourceName: 'people/me',
            personFields: 'names,photos',
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log('PEOPLE API', err);
        });

        window.gapi.client.youtube.playlistItems.list({
            part: ['snippet,contentDetails'],
            maxResults: 50,
            playlistId: 'LL',
        }).then((response) => {
            console.log(response.result);
            // Axios post request to backend,
            // for posting the desired stuff like ligin credentials and youtube data.
        }).catch((err) => {
            console.log('YOUTUBE API', err);
        });
    }

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
    }

    function handleSignoutClick() {
        window.gapi.auth2.getAuthInstance().signOut();
    }

    return (
        <div>
            <button onClick={() => fetchDataFromAPI()}>Execute api call</button>
            <button onClick={() => handleSignInClick()}>Sign In</button>
            <button onClick={() => handleSignoutClick()}>Sign Out</button>
        </div>
    );
}

export default DemoPage;
