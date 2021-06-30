import React from 'react';
import AppRouter from './routers/AppRouter';
import Provider from './provider/Provider';

const ChatApp = () => {
  return (
    <Provider>
      <AppRouter />
    </Provider>
  );
};

export default ChatApp;
