import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const NewMessagesContext = createContext();
export const updateNewMessages = createContext();

export const NewMessageProvider = (props) => {
    const [areNewMessagesAvailable, setareNewMessagesAvailable] = useState(false);

    function toggleBadge(value) {
        setareNewMessagesAvailable(value);
    }
    return (
        <NewMessagesContext.Provider
            value={[areNewMessagesAvailable, setareNewMessagesAvailable]}
        >
            <updateNewMessages.Provider value={toggleBadge}>
                { props.children }
            </updateNewMessages.Provider>
        </NewMessagesContext.Provider>
    );
};

NewMessageProvider.propTypes = {
    children: PropTypes.any,
};
