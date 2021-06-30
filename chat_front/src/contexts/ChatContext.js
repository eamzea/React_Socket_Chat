import { createContext, useReducer } from 'react';
import { ChatInitialState, ChatReducer } from '../reducers/ChatReducer';
import ChatActions from '../actions/ChatActions';

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [ChatState, ChatDispatch] = useReducer(ChatReducer, ChatInitialState);

  return (
    <ChatContext.Provider value={{ ChatState, ChatDispatch, ChatActions }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
