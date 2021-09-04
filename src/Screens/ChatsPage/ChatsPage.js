import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import './ChatsPage.css';
import { Link } from 'react-router-dom';
import {
    RiHome5Fill,
    RiChatSmile3Fill,
    RiAccountCircleFill,
} from 'react-icons/ri';
import axios from 'axios';
import { Context } from '../../StateManagement/Context';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ChatsPage() {
    const [currUser] = useContext(Context);
    const [acticeChats, setacticeChats] = useState([]);

    async function fetchChats() {
        const url = 'http://127.0.0.1:5000/chats';
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userId: currUser,
            },
        };
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setacticeChats(response.data.message);
            }
        });
    }

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div className='chatsPageContainer'>
            <Link
                to='/chats/room'
                className='singleChatBubble'
            >
                <div
                    style={{
                        width: '20%',
                        height: '15vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src='https://avatars.githubusercontent.com/u/72407476?v=4'
                        alt='Profile Picture'
                        style={{
                            width: '75%',
                            borderRadius: '50%',
                        }}
                    />
                </div>
                <div
                    style={{
                        width: '60%',
                        height: '15vh',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    Hey, The chat section is under development, and will be soon available to you !!
                </div>
                <div
                    style={{
                        width: '20%',
                        height: '15vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    11:11 pm
                </div>
            </Link>
            {
                acticeChats.map((chat, chatIndex) => <Link
                    to={{
                        pathname: '/chats/room',
                        state: {
                            receiver: chat,
                        },
                    }}
                    className='singleChatBubble'
                    key={chatIndex}
                >
                    <div
                        style={{
                            width: '20%',
                            height: '15vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={chat.userProfilePhoto}
                            alt='Profile Picture'
                            style={{
                                width: '75%',
                                borderRadius: '50%',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            width: '60%',
                            height: '15vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <div>{chat.username}</div>
                        <div>{chat.lastMessageText}</div>
                    </div>
                    <div
                        style={{
                            width: '20%',
                            height: '15vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {chat.lastMessageTimestamp}
                    </div>
                </Link>)
            }
            <div className='chatsPageFloatingFooter'>
                <Link
                    to='/chats'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiChatSmile3Fill
                        fontSize={35}
                        color='white'
                    />
                </Link>
                <Link
                    to='/'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiHome5Fill
                        fontSize={32}
                        color='lightgrey'
                    />
                </Link>
                <Link
                    to='/profile'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiAccountCircleFill
                        fontSize={32}
                        color='lightgrey'
                    />
                </Link>
            </div>
        </div>
    );
}

export default ChatsPage;
