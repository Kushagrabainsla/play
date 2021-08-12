import React from 'react';
import './ChatRoom.css';
import { useHistory } from 'react-router-dom';

function ChatRoom() {
    const history = useHistory();
    return (
        <div className='chatRoomContainer'>
            <button onClick={() => history.goBack()}>Go Back</button>
            Chatroom
        </div>
    );
}

export default ChatRoom;
