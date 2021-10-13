import React, {
    useState,
    useEffect,
    useContext,
    useRef,
} from 'react';
import './ChatRoom.css';
import {
    RiArrowLeftSLine,
    RiSendPlane2Fill,
} from 'react-icons/ri';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { Input, Button, Modal } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../StateManagement/UserContext';

const socket = io(process.env.REACT_APP_SERVER_PROD_URL);
const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ChatRoom() {
    const lastMessageReference = useRef(null);
    const history = useHistory();
    const location = useLocation();
    const [currUser] = useContext(UserContext);

    const receiver = location.state ? location.state.receiver : JSON.parse(localStorage.getItem('receiver'));
    const room = [currUser, receiver.userId].sort().join('|');
    const [message, setmessage] = useState('');
    const [messages, setmessages] = useState([]);

    async function fetchMessages() {
        const url = `${process.env.REACT_APP_SERVER_PROD_URL}/socket/messages`;
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                room,
            },
        };
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setmessages(response.data.message);
            } else {
                Modal.warn({ content: 'Please check your network connection.' });
            }
        }).catch(() => {
            Modal.warn({ content: 'Please check your network connection.' });
        });
    }

    function sendMessage() {
        if (message) {
            socket.emit(
                'send_message',
                {
                    room,
                    author: currUser,
                    receiver: receiver.userId,
                    body: message,
                    timeStamp: Date.now(),
                },
            );
            setmessage('');
        }
    }

    socket.on('private_message_sent', () => {
        fetchMessages();
    });

    useEffect(() => {
        fetchMessages();
    }, []);

    function scrollToLastMessage() {
        if (lastMessageReference.current) {
            lastMessageReference.current?.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
            });
        }
    }

    useEffect(() => {
        scrollToLastMessage();
    }, [messages]);

    return (
        <div className='chat-room-container'>
            <div className='chatRoomContainer'>
                <div className='chatRoomFloatingHeader'>
                    <div className='chatRoomHeaderLeft'>
                        <RiArrowLeftSLine
                            onClick={() => history.goBack()}
                            style={{
                                fontSize: 32,
                                cursor: 'pointer',
                            }}
                        />
                    </div>
                    <div className='chatRoomHeaderRight'>
                        {receiver.username}
                    </div>
                </div>
                <div className='chatRoomChatContainer'>
                    {
                        messages.map((text, textIndex) => <div
                            key={textIndex}
                        >
                            <div className='chatRoomChatRow'>
                                <img
                                    src={receiver.userProfilePhoto}
                                    alt='Profile Picture'
                                    style={{
                                        display: text.author === currUser ? 'none' : 'flex',
                                        width: '30px',
                                        borderRadius: '50%',
                                        alignSelf: 'flex-end',
                                        boxShadow: '2px 1px 10px lightgrey',
                                    }}
                                />
                                <div
                                    className={
                                        text.author === currUser
                                        ? 'chatRoomBubbleRight'
                                        : 'chatRoomBubbleLeft'
                                    }
                                >
                                    <div className='chatRoomBubbleText'>{text.body}</div>
                                    <div className='chatRoomBubbleTimestamp'>{moment(text.timeStamp).format('LT')}</div>
                                </div>
                            </div>
                        </div>)
                    }
                    <span ref={lastMessageReference}></span>
                </div>
                <div className='chatRoomFloatingFooter'>
                    <div className='chatRoomFooterLeft'>
                        <Input
                            placeholder='Message'
                            onPressEnter={sendMessage}
                            value={message}
                            style={{
                                height: '100%',
                                border: 'none',
                                borderRadius: '50px',
                            }}
                            onChange={(event) => setmessage(event.target.value)}
                        />
                    </div>
                    <div className='chatRoomFooterRight'>
                        <Button
                            type="ghost"
                            shape="circle"
                            size='large'
                            onClick={sendMessage}
                            icon={<RiSendPlane2Fill/>}
                            style={{
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#2a9d8f',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

ChatRoom.propTypes = {
    socket: PropTypes.object,
    joinRoom: PropTypes.func,
    flagForNewMessages: PropTypes.bool,
    location: PropTypes.any,
};

export default ChatRoom;
