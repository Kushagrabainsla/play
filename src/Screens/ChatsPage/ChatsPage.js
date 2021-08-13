import React from 'react';
import './ChatsPage.css';
import { Link } from 'react-router-dom';
import {
    RiHome5Fill,
    RiChatSmile3Fill,
    RiAccountCircleFill,
} from 'react-icons/ri';

function ChatsPage() {
    // axios request to a new routes to get all chats of a user by his/her id.
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
