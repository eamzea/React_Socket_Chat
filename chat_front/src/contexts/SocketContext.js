import React, { createContext, useContext, useEffect } from 'react';
import { scrollToBottomAnimated } from '../helpers/scroll';
import useSocket from '../hooks/useSocket';
import { AuthContext } from './AuthContext';
import { ChatContext } from './ChatContext';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { ChatDispatch, ChatActions } = useContext(ChatContext);
  const { socket, isOnline, connectSocket, disconnectSocket } = useSocket(
    'http://localhost:4000'
  );
  const {
    AuthState: { logged },
  } = useContext(AuthContext);

  useEffect(() => {
    if (logged) {
      connectSocket();
    }
  }, [logged, connectSocket]);

  useEffect(() => {
    if (!logged) {
      disconnectSocket();
    }
  }, [logged, disconnectSocket]);

  useEffect(() => {
    socket?.on('list_users', users => {
      ChatDispatch(ChatActions.loadUsers(users));
    });
  }, [socket, ChatDispatch, ChatActions]);

  useEffect(() => {
    socket?.on('individual_msg', msg => {
      ChatDispatch(ChatActions.loadNewMsg(msg));
      scrollToBottomAnimated('msgs');
    });
  }, [socket, ChatDispatch, ChatActions]);

  return (
    <SocketContext.Provider value={{ socket, isOnline }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
