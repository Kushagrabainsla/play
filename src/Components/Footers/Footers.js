/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import './Footers.css';
import {
    RiAccountCircleFill,
    RiChatSmile3Fill,
    RiHome5Fill,
} from 'react-icons/ri';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import { NewMessagesContext } from '../../StateManagement/NewMessagesContext';

export function HomeFloatingFooter() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='homeFloatingFooter'>
            <Link
                to='/chats'
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Badge dot={areNewMessagesAvailable}>
                    <RiChatSmile3Fill
                        fontSize={32}
                        color='lightgrey'
                    />
                </Badge>
            </Link>
            <Link
                to='/'
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <RiHome5Fill
                    fontSize={32}
                    color='black'
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
    );
}

export function ChatsPageFloatingFooter() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='chatsPageFloatingFooter'>
            <Link
                to='/chats'
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Badge dot={areNewMessagesAvailable}>
                    <RiChatSmile3Fill
                        fontSize={32}
                        color='black'
                    />
                </Badge>
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
    );
}

export function ProfileFloatingFooter() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='profileFloatingFooter'>
            <Link
                to='/chats'
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Badge dot={areNewMessagesAvailable}>
                    <RiChatSmile3Fill
                        fontSize={32}
                        color='lightgrey'
                    />
                </Badge>
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
                    color='black'
                />
            </Link>
        </div>
    );
}
