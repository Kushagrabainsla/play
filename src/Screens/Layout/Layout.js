import React from 'react';
import './Layout.css';
import PropTypes from 'prop-types';

function Layout(props) {
    const ComponentFunction = props.component.type;
    return (
        <div className='layoutContainer'>
            <ComponentFunction/>
        </div>
    );
}

Layout.propTypes = {
    component: PropTypes.object,
};

export default Layout;
