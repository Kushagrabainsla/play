import React from 'react';
import './Layout.css';
import PropTypes from 'prop-types';

function Layout(props) {
    const ComponentFunction = props.component.type;
    const { socket, joinRoom } = props;
    return (
        <div className='layoutContainer'>
            <ComponentFunction
                socket={socket}
                joinRoom={joinRoom}
            />
        </div>
    );
}

Layout.propTypes = {
    component: PropTypes.object,
    socket: PropTypes.object,
    joinRoom: PropTypes.func,
};

export default Layout;
