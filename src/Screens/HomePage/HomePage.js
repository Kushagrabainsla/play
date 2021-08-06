import React from 'react';
import './HomePage.css';
import { Card } from 'antd';

function HomePage() {
    const { Meta } = Card;
    const matches = [
        {
            name: 'kushagra',
            tags: ['ryr', 'gbg', 'fdvdfsv', 'dsfbdgb'],
            photoUrl: '',
        },
        {
            name: 'sachin',
            tags: ['ryr', 'gbg', 'fdvdfsv', 'dsfbdgb'],
            photoUrl: '',
        },
        {
            name: 'mohit',
            tags: ['ryr', 'gbg', 'fdvdfsv', 'dsfbdgb'],
            photoUrl: '',
        },
        {
            name: 'hrithik',
            tags: ['ryr', 'gbg', 'fdvdfsv', 'dsfbdgb'],
            photoUrl: '',
        },
    ];
    return (
        <div className='homeContainer'>
            <div className='matchedProfilesContainer'>
                {
                    matches.map((matchedProfile, index) => <div key={index} className='matchedProfile'>
                        <Card
                            hoverable
                            cover={<img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                width='150px'
                            />}
                        >
                            <Meta title={matchedProfile.name} description="www.instagram.com" />
                        </Card>
                    </div>)
                }
            </div>
            <div className='homeFloatingFooter'>
                <div>Chats</div>
                <div>Profile</div>
            </div>
        </div>
    );
}

export default HomePage;
