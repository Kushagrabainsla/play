import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import './ChatsPage.css';
import {
    Modal,
    Skeleton,
    Badge,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { UserContext } from '../../StateManagement/UserContext';
import { ChatsPageFloatingFooter } from '../../Components/Footers/Footers';
import { updateNewMessages } from '../../StateManagement/NewMessagesContext';

const socket = io(process.env.REACT_APP_SERVER_PROD_URL);
const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ChatsPage() {
    const [currUser] = useContext(UserContext);
    const toggleBadge = useContext(updateNewMessages);
    const [acticeChats, setacticeChats] = useState(false);

    function checkNewMessage(messages) {
        for (let index = 0; index < messages.length; index += 1) {
            if (messages[index].lastMessageSeen === false) {
                toggleBadge(true);
                return;
            }
        }
        toggleBadge(false);
    }

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
                checkNewMessage(response.data.message);
                setacticeChats(response.data.message);
            } else {
                Modal.warn({ content: 'Please check your network connection.' });
            }
        }).catch(() => {
            Modal.warn({ content: 'Please check your network connection.' });
        });
    }

    async function markMessagesSeen(receiver) {
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/socket/markMessage`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                authorId: currUser,
                receiverId: receiver.userId,
            },
        };
        const value = true;
        axios.put(url, value, config).catch(() => {
            Modal.warn({ content: 'Please check your network connection.' });
        });
    }

    socket.on('private_message_sent', () => {
        fetchChats();
    });

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div className='chatsPageContainer'>
            {
                // eslint-disable-next-line no-nested-ternary
                acticeChats
                ? acticeChats.length > 0
                    ? acticeChats
                    .sort((ele1, ele2) => ele2.lastMessageTimestamp - ele1.lastMessageTimestamp)
                    .map((chat) => <Link
                        to={{
                            pathname: '/chats/room',
                            state: {
                                receiver: chat,
                            },
                        }}
                        className='singleChatBubble'
                        key={chat.userId}
                        onClick={() => {
                            localStorage.setItem('receiver', JSON.stringify(chat));
                            markMessagesSeen(chat);
                        }}
                    >
                        <div className='chatBubbleLeft'>
                            <Badge dot={!chat.lastMessageSeen} offset={[-20, 5]}>
                                <img
                                    src={chat.userProfilePhoto}
                                    alt='Profile Picture'
                                    className='chatProfilePhoto'
                                />
                            </Badge>
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
            <ChatsPageFloatingFooter/>
        </div>
    );
}

export default ChatsPage;
