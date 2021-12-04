/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import './Footers.css';
import {
    RiAccountCircleFill,
    RiChatSmile3Fill,
    RiHome5Fill,
    RiHome5Line,
    RiChatSmile3Line,
    RiAccountCircleLine,
    RiSettings3Line,
    RiSettings3Fill,
} from 'react-icons/ri';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import { NewMessagesContext } from '../../StateManagement/NewMessagesContext';

export function HomeFloatingFooter() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='floatingFooter'>
            <Link
                to='/'
                className='footer-icon-container'
            >
                <RiHome5Fill className='footer-icon-black' />
            </Link>
            <Link
                to='/chats'
                className='footer-icon-container'
            >
                <Badge dot={areNewMessagesAvailable}>
                    <RiChatSmile3Line className='footer-icon-lightgrey' />
                </Badge>
            </Link>
            <Link
                to='/profile'
                className='footer-icon-container'
            >
                <RiAccountCircleLine className='footer-icon-lightgrey' />
            </Link>
            <Link
                to='/more'
                className='footer-icon-container'
            >
                <RiSettings3Line className='footer-icon-lightgrey' />
            </Link>
        </div>
    );
}

export function ChatsPageFloatingFooter() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='floatingFooter'>
            <Link
                to='/'
                className='footer-icon-container'
            >
                <RiHome5Line className='footer-icon-lightgrey' />
            </Link>
            <Link
                to='/chats'
                className='footer-icon-container'
            >
                <Badge dot={areNewMessagesAvailable}>
                    <RiChatSmile3Fill className='footer-icon-black' />
                </Badge>
            </Link>
            <Link
                to='/profile'
                className='footer-icon-container'
            >
                <RiAccountCircleLine className='footer-icon-lightgrey' />
            </Link>
            <Link
                to='/more'
                className='footer-icon-container'
            >
                <RiSettings3Line className='footer-icon-lightgrey' />
            </Link>
        </div>
    );
}

export function ProfileFloatingFooter() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='floatingFooter'>
            <Link
                to='/'
                className='footer-icon-container'
            >
                <RiHome5Line className='footer-icon-lightgrey' />
            </Link>
            <Link
                to='/chats'
                className='footer-icon-container'
            >
                <Badge dot={areNewMessagesAvailable}>
                    <RiChatSmile3Line className='footer-icon-lightgrey' />
                </Badge>
            </Link>
            <Link
                to='/profile'
                className='footer-icon-container'
            >
                <RiAccountCircleFill className='footer-icon-black' />
            </Link>
            <Link
                to='/more'
                className='footer-icon-container'
            >
                <RiSettings3Line className='footer-icon-lightgrey' />
            </Link>
        </div>
    );
}

export function MoreFloatingFooter() {
    const [areNewMessagesAvailable] = useContext(NewMessagesContext);
    return (
        <div className='floatingFooter'>
            <Link
                to='/'
                className='footer-icon-container'
            >
                <RiHome5Line className='footer-icon-lightgrey' />
            </Link>
            <Link
                to='/chats'
                className='footer-icon-container'
            >
                <Badge dot={areNewMessagesAvailable}>
                    <RiChatSmile3Line className='footer-icon-lightgrey' />
                </Badge>
            </Link>
            <Link
                to='/profile'
                className='footer-icon-container'
            >
                <RiAccountCircleLine className='footer-icon-lightgrey' />
            </Link>
            <Link
                to='/more'
                className='footer-icon-container'
            >
                <RiSettings3Fill className='footer-icon-black' />
            </Link>
        </div>
    );
}
