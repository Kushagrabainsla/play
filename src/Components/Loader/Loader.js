import React from 'react';
import './Loader.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Loader() {
    return (
        <div className='loader-container'>
            <Spin
                spinning={true}
                indicator={<LoadingOutlined style={{ fontSize: 36, color: '#264653' }} spin />}
            />
        </div>
    );
}

export default Loader;
