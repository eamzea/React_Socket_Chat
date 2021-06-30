import React from 'react';
import AuthProvider from '../contexts/AuthContext';
import ChatProvider from '../contexts/ChatContext';
import SocketProvider from '../contexts/SocketContext';

const Provider = ({ children }) => {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider>{children}</SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
};

export default Provider;
