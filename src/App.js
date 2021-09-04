import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import './App.css';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Layout from './Screens/Layout/Layout';
import HomePage from './Screens/HomePage/HomePage';
import LoginPage from './Screens/LoginPage/LoginPage';
import ProfilePage from './Screens/ProfilePage/ProfilePage';
import WelcomePage from './Screens/WelcomePage/WelcomePage';
import ChatsPage from './Screens/ChatsPage/ChatsPage';
import ChatRoom from './Screens/ChatRoom/ChatRoom';
import NotFound from './Screens/NotFound/NotFound';

import { Context } from './StateManagement/Context';

const socket = io('http://localhost:5000');

function App() {
    const [currUser] = useContext(Context);
    const [rooms, setrooms] = useState([]);

    async function fetchRooms() {
        const url = 'http://localhost:5000/rooms';
        axios.get(url).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setrooms(response.data.message);
            }
        });
    }
    async function addRoom(room) {
        const url = 'http://localhost:5000/rooms';
        const config = {
            headers: { room },
        };
        axios.post(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
            setrooms(response.data.message);
            }
        });
    }

    function joinRoom(room, username, partner) {
        // eslint-disable-next-line no-param-reassign
        room = room || [username, partner].sort().join('|');
        if (rooms.indexOf(room) === -1) {
            socket.emit('join_room', { username, room });
            fetchRooms();
        }
    }

    function setSocketListeners() {
        socket.on('message', (data) => {
            // eslint-disable-next-line no-console
            console.log(data.message);
        });

        socket.on('message_sent', (message) => {
          const { room } = message;
          if (rooms.indexOf(room) === -1) addRoom(room);
        });

        socket.on('open_room', (data) => {
            const { room } = data;
            const userInRoom = room.split('|').indexOf(currUser) !== -1;
            const roomNotOpen = rooms.indexOf(room) === -1;
            if (userInRoom && roomNotOpen) {
                joinRoom(room, currUser);
            }
        });
      }

    useEffect(() => {
        fetchRooms();
        setSocketListeners();
      }, []);

    if (currUser) {
        return (
            <Router>
                <Switch>
                    <Route exact path='/chats/room'>
                        {/* Props are not passing down the tree. (BUG) */}
                        <Layout component={<ChatRoom socket={socket} joinRoom={joinRoom}/>} />
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
