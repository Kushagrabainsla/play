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
    Divider,
    Avatar,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { UserContext } from '../../StateManagement/UserContext';
import { updateNewMessages } from '../../StateManagement/NewMessagesContext';
import { ChatsPageFloatingFooter } from '../../Components/Footers/Footers';
import { ChatsLeftTab } from '../../Components/LeftCompartment/LeftCompartment';
import RightCompartment from '../../Components/RightCompartment/RightCompartment';

const socket = io(process.env.REACT_APP_SERVER_PROD_URL);
const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ChatsPage() {
    const [currUser] = useContext(UserContext);
    const toggleBadge = useContext(updateNewMessages);
    const [acticeChats, setacticeChats] = useState(false);

    function formattedDate(date) {
        const today = new Date();
        if (moment(date).format('DD/MM/YY') === moment(today).format('DD/MM/YY')) {
            return moment(date).format('LT');
        }
        const todayDD = parseInt(moment(today).format('DD'), 10);
        const dateDD = parseInt(moment(date).format('DD'), 10);
        const todayMM = parseInt(moment(today).format('MM'), 10);
        const dateMM = parseInt(moment(date).format('MM'), 10);
        const todayYY = parseInt(moment(today).format('YY'), 10);
        const dateYY = parseInt(moment(date).format('YY'), 10);
        if ((todayDD === dateDD + 1) && (todayMM === dateMM) && (todayYY === dateYY)) {
            return 'Yesterday';
        }
        return moment(date).format('DD/MM/YY');
    }
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
        <div className='chats-page-container'>
            <Helmet>
                <title>Messages / Play</title>
            </Helmet>
            <ChatsLeftTab/>
            <div className='chats-page-middle-area'>
                <div className='chats-page-chat-container'>
                {
                    // eslint-disable-next-line no-nested-ternary
                    acticeChats
                    ? acticeChats.length > 0
                        ? acticeChats
                        .sort((ele1, ele2) => ele2.lastMessageTimestamp - ele1.lastMessageTimestamp)
                        .map((chat) => <div
                            className='sngleChatContainer'
                            key={chat.userId}
                        >
                            <Divider/>
                            <Link
                                to={{
                                    pathname: '/chats/room',
                                    state: {
                                        receiver: chat,
                                    },
                                }}
                                className='singleChatBubble'
                                onClick={() => {
                                    localStorage.setItem('receiver', JSON.stringify(chat));
                                    markMessagesSeen(chat);
                                }}
                            >
                                <div className='chatBubbleLeft'>
                                    <Badge dot={!chat.lastMessageSeen} offset={[-10, 5]}>
                                        <Avatar
                                            size={55}
                                            src={chat.userProfilePhoto}
                                            style={{
                                                border: '2px solid white',
                                                boxShadow: '2px 1px 10px lightgrey',
                                            }}
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
                                    { formattedDate(chat.lastMessageTimestamp) }
                                </div>
                            </Link>
                        </div>)
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
                </div>
            </div>
            <RightCompartment/>
            <ChatsPageFloatingFooter/>
        </div>
    );
}

export default ChatsPage;
