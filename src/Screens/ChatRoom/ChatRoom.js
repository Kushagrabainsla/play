import React from 'react';
import './ChatRoom.css';
import {
    RiArrowLeftSLine,
} from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

function ChatRoom() {
    const history = useHistory();
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
                    {'Play'}
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
