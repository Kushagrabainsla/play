import React, { useContext } from 'react';
import './App.css';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './Screens/Layout/Layout';
import HomePage from './Screens/HomePage/HomePage';
import LoginPage from './Screens/LoginPage/LoginPage';
import ProfilePage from './Screens/ProfilePage/ProfilePage';
import WelcomePage from './Screens/WelcomePage/WelcomePage';
import ChatsPage from './Screens/ChatsPage/ChatsPage';
import ChatRoom from './Screens/ChatRoom/ChatRoom';
import { Context } from './Context';

function App() {
    const [currUser] = useContext(Context);

    if (currUser) {
        return (
            <Router>
                <Switch>
                    <Route path='/chats/room'>
                        <Layout component={<ChatRoom/>}/>
                    </Route>
                    <Route path='/chats'>
                        <Layout component={<ChatsPage/>}/>
                    </Route>
                    <Route path='/profile'>
                        <Layout component={<ProfilePage/>}/>
                    </Route>
                    <Route path='/'>
                        <Layout component={<HomePage/>}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
    return (
        <Router>
            <Switch>
                <Route path='/login'>
                    <Layout component={<LoginPage/>}/>
                </Route>
                <Route path='/'>
                    <Layout component={<WelcomePage/>}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
