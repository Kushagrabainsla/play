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
    RiMoreLine,
    RiMoreFill,
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
                    <RiChatSmile3Line className='page-left-element-icon' />
                </Badge>
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>Messages</div>
            </Link>
            <Link
                to='/'
                className='page-left-element'
            >
                <RiHome5Fill className='page-left-element-icon' />
                <div className='page-left-element-text' style={{ fontWeight: '600' }}>Home</div>
            </Link>
            <Link
                to='/profile'
                className='page-left-element'
            >
                <RiAccountCircleLine className='page-left-element-icon' />
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>Profile</div>
            </Link>
            <Link
                to='/more'
                className='page-left-element'
            >
                <RiMoreLine className='page-left-element-icon' />
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>More</div>
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
                    <RiChatSmile3Line className='page-left-element-icon' />
                </Badge>
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>Messages</div>
            </Link>
            <Link
                to='/'
                className='page-left-element'
            >
                <RiHome5Line className='page-left-element-icon'/>
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>Home</div>
            </Link>
            <Link
                to='/profile'
                className='page-left-element'
            >
                <RiAccountCircleFill className='page-left-element-icon'/>
                <div className='page-left-element-text' style={{ fontWeight: '600' }}>Profile</div>
            </Link>
            <Link
                to='/more'
                className='page-left-element'
            >
                <RiMoreLine className='page-left-element-icon' />
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>More</div>
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
                    <RiChatSmile3Fill className='page-left-element-icon'/>
                </Badge>
                <div className='page-left-element-text' style={{ fontWeight: '600' }}>Messages</div>
            </Link>
            <Link
                to='/'
                className='page-left-element'
            >
                <RiHome5Line className='page-left-element-icon'/>
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>Home</div>
            </Link>
            <Link
                to='/profile'
                className='page-left-element'
            >
                <RiAccountCircleLine className='page-left-element-icon' />
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>Profile</div>
            </Link>
            <Link
                to='/more'
                className='page-left-element'
            >
                <RiMoreLine className='page-left-element-icon' />
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>More</div>
            </Link>
        </div>
    );
}

export function MoreLeftTab() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='page-left-area'>
            <Link
                to='/chats'
                className='page-left-element'
            >
                <Badge dot={areNewMessagesAvailable} >
                    <RiChatSmile3Line className='page-left-element-icon'/>
                </Badge>
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>Messages</div>
            </Link>
            <Link
                to='/'
                className='page-left-element'
            >
                <RiHome5Line className='page-left-element-icon'/>
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>Home</div>
            </Link>
            <Link
                to='/profile'
                className='page-left-element'
            >
                <RiAccountCircleLine className='page-left-element-icon' />
                <div className='page-left-element-text' style={{ fontWeight: '400' }}>Profile</div>
            </Link>
            <Link
                to='/more'
                className='page-left-element'
            >
                <RiMoreFill className='page-left-element-icon' />
                <div className='page-left-element-text' style={{ fontWeight: '600' }}>More</div>
            </Link>
        </div>
    );
}
