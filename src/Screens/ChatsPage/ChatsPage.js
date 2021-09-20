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
import io from 'socket.io-client';
import {
    Modal,
    Skeleton,
    // Badge,
} from 'antd';
import moment from 'moment';
import { Context } from '../../StateManagement/Context';

const socket = io(process.env.REACT_APP_SERVER_PROD_URL);
const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ChatsPage() {
    const [currUser] = useContext(Context);
    const [acticeChats, setacticeChats] = useState(false);
    // const [areNewMessagesAvailable, setareNewMessagesAvailable] = useState(false);
    // function areChatsEqual(oldChats, newChats) {
    //     if (oldChats.length !== newChats.length) return false;

    //     for (let i = 0; i < oldChats.length; i += 1) {
    //         if (oldChats[i].lastMessageText !== newChats[i].lastMessageText) return false;
    //         if (oldChats[i].lastMessageTimestamp !== newChats[i].lastMessageTimestamp) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    async function fetchChats() {
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/socket/chats`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                userId: currUser,
            },
        };
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                // const oldChatInfo = JSON.parse(localStorage.getItem('userChats'));
                // If old messages and new messages are not same.
                // if (areChatsEqual(oldChatInfo, response.data.message) === false) {
                //     setareNewMessagesAvailable(true);
                // }
                setacticeChats(response.data.message);
                // localStorage.setItem('userChats', JSON.stringify(response.data.message));
            } else {
                Modal.warn({ content: 'Error while loading conversations, please refresh !!' });
            }
        }).catch(() => {
            Modal.warn({ content: 'Error while loading conversations, please refresh !!' });
        });
    }

    function setSocketListeners() {
        socket.on('private_message_sent', () => {
            fetchChats();
        });
    }

    useEffect(() => {
        setSocketListeners();
        fetchChats();
    }, []);

    return (
        <div className='chatsPageContainer'>
            {
                // eslint-disable-next-line no-nested-ternary
                acticeChats
                ? acticeChats.length > 0
                    ? acticeChats.map((chat) => <Link
                        to={{
                            pathname: '/chats/room',
                            state: {
                                receiver: chat,
                            },
                        }}
                        className='singleChatBubble'
                        key={chat.userId}
                    >
                        <div className='chatBubbleLeft'>
                            <img
                                src={chat.userProfilePhoto}
                                alt='Profile Picture'
                                className='chatProfilePhoto'
                            />
                        </div>
                        <div className='chatBubbleMid' >
                            <div className='chatBubbleUpperMid' >
                                {chat.username}
                            </div>
                            <div className='chatBubbleLowerMid'>
                                {chat.lastMessageText}
                            </div>
                        </div>
                        <div className='chatBubbleRight'>
                            { moment(chat.lastMessageTimestamp).format('LT') }
                        </div>
                    </Link>)
                    : <div className='noChatBubble'>
                        <div className='noChatBubbleLeft'>
                            <img
                                src='https://raw.githubusercontent.com/Kushagrabainsla/play/master/public/playLogo.ico'
                                width='100%'
                            />
                        </div>
                        <div className='noChatBubbleRight' >
                            You do not have any conversations yet,
                            go to your connections page, and tap on any
                            interest tag of your favourite connection
                            to start a conversation.
                        </div>
                    </div>
                : <>
                    {
                        [0, 1, 2, 3, 4].map((id) => <Skeleton
                            key={id}
                            active
                            avatar
                            paragraph={{ rows: 1 }}
                            className='chatBubbleSkeleton'
                        />)
                    }
                </>
            }
            <div className='chatsPageFloatingFooter'>
                <Link
                    to='/chats'
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <RiChatSmile3Fill
                        fontSize={32}
                        color='black'
                    />
                    {/* <Badge dot={areNewMessagesAvailable}>
                        <RiChatSmile3Fill
                            fontSize={32}
                            color='black'
                        />
                    </Badge> */}
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
