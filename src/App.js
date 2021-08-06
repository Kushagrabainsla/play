import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './Screens/Layout/Layout';
import HomePage from './Screens/HomePage/HomePage';
import LoginPage from './Screens/LoginPage/LoginPage';
import ProfilePage from './Screens/ProfilePage/ProfilePage';

function App() {
    const userToken = true;

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
                <Route path='/login'>
                    <Layout component={<LoginPage/>}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
