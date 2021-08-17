import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();
export const updateContext = createContext();

export const Provider = (props) => {
    const [currUser, setcurrUser] = useState(localStorage.getItem('currUser'));
    function toggleUser(user) {
        setcurrUser(user);
    }
    return (
        <Context.Provider value={[currUser, setcurrUser]}>
            <updateContext.Provider value={toggleUser}>
                { props.children }
            </updateContext.Provider>
        </Context.Provider>
    );
};

Provider.propTypes = {
    children: PropTypes.any,
};
