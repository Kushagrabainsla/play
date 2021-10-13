/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import './LeftCompartment.css';
import {
    RiHome5Fill,
    RiChatSmile3Line,
    RiAccountCircleLine,
    RiAccountCircleFill,
    RiChatSmile3Fill,
    RiHome5Line,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import { NewMessagesContext } from '../../StateManagement/NewMessagesContext';

export function HomeLeftTab() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='page-left-area'>
            <Link
                to='/chats'
                className='page-left-element'
            >
                <Badge dot={areNewMessagesAvailable}>
                    <RiChatSmile3Line
                        fontSize={32}
                        color='rgb(15, 20, 25)'
                    />
                </Badge>
                <div className='page-left-element-text' style={{ color: 'rgb(15, 20, 25)', fontWeight: '400' }}>Messages</div>
            </Link>
            <Link
                to='/'
                className='page-left-element'
            >
                <RiHome5Fill
                    fontSize={32}
                    color='rgb(15, 20, 25)'
                />
                <div className='page-left-element-text' style={{ color: 'rgb(15, 20, 25)', fontWeight: '600' }}>Home</div>
            </Link>
            <Link
                to='/profile'
                className='page-left-element'
            >
                <RiAccountCircleLine
                    fontSize={32}
                    color='rgb(15, 20, 25)'
                />
                <div className='page-left-element-text' style={{ color: 'rgb(15, 20, 25)', fontWeight: '400' }}>Profile</div>
            </Link>
        </div>
    );
}

export function ProfileLeftTab() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='page-left-area'>
            <Link
                to='/chats'
                className='page-left-element'
            >
                <Badge dot={areNewMessagesAvailable}>
                    <RiChatSmile3Line
                        fontSize={32}
                        color='rgb(15, 20, 25)'
                    />
                </Badge>
                <div className='page-left-element-text' style={{ color: 'rgb(15, 20, 25)', fontWeight: '400' }}>Messages</div>
            </Link>
            <Link
                to='/'
                className='page-left-element'
            >
                <RiHome5Line
                    fontSize={32}
                    color='rgb(15, 20, 25)'
                />
                <div className='page-left-element-text' style={{ color: 'rgb(15, 20, 25)', fontWeight: '400' }}>Home</div>
            </Link>
            <Link
                to='/profile'
                className='page-left-element'
            >
                <RiAccountCircleFill
                    fontSize={32}
                    color='rgb(15, 20, 25)'
                />
                <div className='page-left-element-text' style={{ color: 'rgb(15, 20, 25)', fontWeight: '600' }}>Profile</div>
            </Link>
        </div>
    );
}

export function ChatsLeftTab() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='page-left-area'>
            <Link
                to='/chats'
                className='page-left-element'
            >
                <Badge dot={areNewMessagesAvailable} >
                    <RiChatSmile3Fill
                        fontSize={32}
                        color='rgb(15, 20, 25)'
                    />
                </Badge>
                <div className='page-left-element-text' style={{ color: 'rgb(15, 20, 25)', fontWeight: '600' }}>Messages</div>
            </Link>
            <Link
                to='/'
                className='page-left-element'
            >
                <RiHome5Line
                    fontSize={32}
                    color='rgb(15, 20, 25)'
                />
                <div className='page-left-element-text' style={{ color: 'rgb(15, 20, 25)', fontWeight: '400' }}>Home</div>
            </Link>
            <Link
                to='/profile'
                className='page-left-element'
            >
                <RiAccountCircleLine
                    fontSize={32}
                    color='rgb(15, 20, 25)'
                />
                <div className='page-left-element-text' style={{ color: 'rgb(15, 20, 25)', fontWeight: '400' }}>Profile</div>
            </Link>
        </div>
    );
}
