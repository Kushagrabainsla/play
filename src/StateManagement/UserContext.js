import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();
export const updateUserContext = createContext();

export const UserProvider = (props) => {
    const [currUser, setcurrUser] = useState(localStorage.getItem('currUser'));

    function toggleUser(user) {
        setcurrUser(user);
    }
    return (
        <UserContext.Provider value={[currUser, setcurrUser]}>
            <updateUserContext.Provider value={toggleUser}>
                { props.children }
            </updateUserContext.Provider>
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.any,
};
