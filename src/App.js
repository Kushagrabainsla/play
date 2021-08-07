import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './Screens/Layout/Layout';
import HomePage from './Screens/HomePage/HomePage';
import LoginPage from './Screens/LoginPage/LoginPage';
import ProfilePage from './Screens/ProfilePage/ProfilePage';
import WelcomePage from './Screens/WelcomePage/WelcomePage';

function App() {
    const userToken = null;

    // return (
    //     <Router>
    //         <Switch>
    //             <Route path='/profile'>
    //                 <Layout component={<ProfilePage/>}/>
    //             </Route>
    //             <Route path='/feed'>
    //                 <Layout component={<HomePage/>}/>
    //             </Route>

    //             <Route path='/login'>
    //                 <Layout component={<LoginPage/>}/>
    //             </Route>
    //             <Route path='/'>
    //                 <Layout component={<WelcomePage/>}/>
    //             </Route>
    //         </Switch>
    //     </Router>
    // );

    if (userToken !== null) {
        return (
            <Router>
                <Switch>
                    <Route path='/profile'>
                        <Layout component={<ProfilePage/>}/>
                    </Route>
                    <Route path='/'>
                        <Layout component={<HomePage/>}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
    return (
        <Router>
            <Switch>
                <Route path='/play/login'>
                    <Layout component={<LoginPage/>}/>
                </Route>
                <Route path='/play'>
                    <Layout component={<WelcomePage/>}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
