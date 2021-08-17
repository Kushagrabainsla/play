import React, { useContext } from 'react';
import './App.css';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Layout from './Screens/Layout/Layout';
import HomePage from './Screens/HomePage/HomePage';
import LoginPage from './Screens/LoginPage/LoginPage';
import ProfilePage from './Screens/ProfilePage/ProfilePage';
import WelcomePage from './Screens/WelcomePage/WelcomePage';
import ChatsPage from './Screens/ChatsPage/ChatsPage';
import ChatRoom from './Screens/ChatRoom/ChatRoom';
import NotFound from './Screens/NotFound/NotFound';

import { Context } from './StateManagement/Context';

function App() {
    const [currUser] = useContext(Context);

    if (currUser) {
        return (
            <Router>
                <Switch>
                    <Route exact path='/chats/room'>
                        <Layout component={<ChatRoom/>}/>
                    </Route>
                    <Route exact path='/chats'>
                        <Layout component={<ChatsPage/>}/>
                    </Route>
                    <Route exact path='/profile'>
                        <Layout component={<ProfilePage/>}/>
                    </Route>
                    <Route exact path='/'>
                        <Layout component={<HomePage/>}/>
                    </Route>
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        );
    }
    return (
        <Router>
            <Switch>
                <Route exact path='/welcome'>
                    <Layout component={<WelcomePage/>}/>
                </Route>
                <Route exact path='/'>
                    <Layout component={<LoginPage/>}/>
                </Route>
                <Route>
                    <Layout component={<NotFound/>}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
