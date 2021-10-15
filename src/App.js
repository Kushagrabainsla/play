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
import Loader from './Components/Loader/Loader';
import { UserContext } from './StateManagement/UserContext';

const Legals = lazy(() => import('./Screens/Legals/Legals'));
const NotFound = lazy(() => import('./Screens/NotFound/NotFound'));
const HomePage = lazy(() => import('./Screens/HomePage/HomePage'));
const ChatRoom = lazy(() => import('./Screens/ChatRoom/ChatRoom'));
const MorePage = lazy(() => import('./Screens/MorePage/MorePage'));
const ChatsPage = lazy(() => import('./Screens/ChatsPage/ChatsPage'));
const LoginPage = lazy(() => import('./Screens/LoginPage/LoginPage'));
const ProfilePage = lazy(() => import('./Screens/ProfilePage/ProfilePage'));
const WelcomePage = lazy(() => import('./Screens/WelcomePage/WelcomePage'));

function App() {
    const [currUser] = useContext(UserContext);

    if (currUser) {
        return (
            <Router>
                <Suspense fallback={<Loader/>}>
                    <Switch>
                        <Route exact path='/privacy-policy'>
                            <Legals legalTitle='privacy-policy'/>
                        </Route>
                        <Route exact path='/welcome' component={WelcomePage}/>
                        <Route exact path='/profile' component={ProfilePage}/>
                        <Route exact path='/chats/room' component={ChatRoom}/>
                        <Route exact path='/chats' component={ChatsPage}/>
                        <Route exact path='/more' component={MorePage}/>
                        <Route exact path='/' component={HomePage}/>
                        <Redirect from='*' to='/' />
                    </Switch>
                </Suspense>
            </Router>
        );
    }
    return (
        <Router>
            <Suspense fallback={<Loader/>}>
                <Switch>
                    <Route exact path='/privacy-policy'>
                        <Legals legalTitle='privacy-policy'/>
                    </Route>
                    <Route exact path='/welcome' component={WelcomePage}/>
                    <Route exact path='/' component={LoginPage}/>
                    <Route component={NotFound}/>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
