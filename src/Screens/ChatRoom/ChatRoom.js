import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import './ChatRoom.css';
import {
    RiArrowLeftSLine,
} from 'react-icons/ri';
import { Input, Button } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Context } from '../../StateManagement/Context';

const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

function ChatRoom(props) {
    const history = useHistory();
    const location = useLocation();
    const [currUser] = useContext(Context);

    const { socket, joinRoom } = props;
    const { receiver } = location.state;

    const room = [currUser, receiver.userId].sort().join('|');
    const [message, setmessage] = useState('');
    const [messages, setmessages] = useState([]);

    async function fetchMessages() {
        const url = 'http://localhost:5000/messages';
        const config = {
            headers: {
                Authorization: AUTH_TOKEN,
                room,
            },
        };
        axios.get(url, config).then((response) => {
            if (response.status === 200 && response.data.error === false) {
                setmessages(response.data.message);
            }
        });
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
        fetchMessages();
    }

    function handleMessageChange(event) {
        setmessage(event.target.value);
    }

    useEffect(() => {
        console.log(props.socket, props.joinRoom);
        joinRoom(null, currUser, receiver.userId);
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
            <div
                style={{
                    marginTop: '100px',
                }}
            >
                {
                    messages.map((text, textIndex) => <div
                        key={textIndex}
                    >
                        {text.author}  :  {text.body}
                    </div>)
                }
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
                        onChange={(e) => handleMessageChange(e)}
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
    socket: PropTypes.any,
    joinRoom: PropTypes.func,
};

export default ChatRoom;
