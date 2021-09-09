import React, {
    useState,
    useEffect,
    useContext,
    useRef,
} from 'react';
import './ChatRoom.css';
import {
    RiArrowLeftSLine,
} from 'react-icons/ri';
import axios from 'axios';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { Input, Button, Modal } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { Context } from '../../StateManagement/Context';

const socket = io(process.env.REACT_APP_SERVER_PROD_URL);
const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ChatRoom() {
    const lastMessageReference = useRef(null);
    const history = useHistory();
    const location = useLocation();
    const [currUser] = useContext(Context);

    // On refreshing, the location.state becomes undefined. (BUG)
    const { receiver } = location.state;

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
                Modal.warn({ content: 'Error while loading messages, please refresh !!' });
            }
        }).catch(() => {
            Modal.warn({ content: 'Error while loading messages, please refresh !!' });
        });
        if (lastMessageReference.current) lastMessageReference.current.scrollIntoView({ behavior: 'smooth' });
    }

    function sendMessage() {
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

    function setSocketListeners() {
        socket.on('private_message_sent', () => {
            fetchMessages();
        });
    }

    useEffect(() => {
        setSocketListeners();
        fetchMessages();
    }, []);

    return (
        <div className='chatRoomContainer'>
            <div className='chatRoomFloatingHeader'>
                <div className='chatRoomHeaderLeft'>
                    <RiArrowLeftSLine
                        onClick={() => history.goBack()}
                        style={{
                            fontSize: 32,
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
                            <div className={ text.author === currUser ? 'chatRoomBubbleRight' : 'chatRoomBubbleLeft'}>
                                <div className='chatRoomBubbleText'>{text.body}</div>
                            </div>
                        </div>
                    </div>)
                }
                <span style={{ marginBottom: 40 }} ref={lastMessageReference}></span>
            </div>
            <div className='chatRoomFloatingFooter'>
                <div className='chatRoomFooterLeft'>
                    <Input
                        placeholder='Message'
                        allowClear
                        value={message}
                        style={{
                            height: '100%',
                            border: 'none',
                        }}
                        onChange={(event) => setmessage(event.target.value)}
                    />
                </div>
                <div className='chatRoomFooterRight'>
                    <Button
                        type="ghost"
                        shape="round"
                        onClick={sendMessage}
                        style={{
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            background: '#2a9d8f',
                            fontWeight: '500',
                        }}
                    >
                        Send
                    </Button>
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
