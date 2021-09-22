import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import 'remixicon/fonts/remixicon.css';
import App from './App';
import { UserProvider } from './StateManagement/UserContext';
import { NewMessageProvider } from './StateManagement/NewMessagesContext';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <NewMessageProvider>
        <App />
      </NewMessageProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
