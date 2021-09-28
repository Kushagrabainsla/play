import React, {
    useContext,
    Suspense,
    lazy,
} from 'react';
import './App.css';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Layout from './Screens/Layout/Layout';
import Loader from './Components/Loader/Loader';
import { UserContext } from './StateManagement/UserContext';

const Legals = lazy(() => import('./Screens/Legals/Legals'));
const NotFound = lazy(() => import('./Screens/NotFound/NotFound'));
const HomePage = lazy(() => import('./Screens/HomePage/HomePage'));
const ChatRoom = lazy(() => import('./Screens/ChatRoom/ChatRoom'));
const LoginPage = lazy(() => import('./Screens/LoginPage/LoginPage'));
const ChatsPage = lazy(() => import('./Screens/ChatsPage/ChatsPage'));
const ProfilePage = lazy(() => import('./Screens/ProfilePage/ProfilePage'));
const WelcomePage = lazy(() => import('./Screens/WelcomePage/WelcomePage'));

function App() {
    const [currUser] = useContext(UserContext);

    if (currUser) {
        return (
            <Router>
                <Suspense fallback={<Loader/>}>
                    <Switch>
                        <Route exact path='/chats/room'>
                            <Layout component={<ChatRoom/>} />
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
                </Suspense>
            </Router>
        );
    }
    return (
        <Router>
            <Suspense fallback={<Loader/>}>
                <Switch>
                    <Route exact path='/welcome'>
                        <WelcomePage/>
                    </Route>
                    <Route exact path='/privacy-policy'>
                        <Legals legalTitle='privacy-policy'/>
                    </Route>
                    <Route exact path='/'>
                        <LoginPage/>
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
